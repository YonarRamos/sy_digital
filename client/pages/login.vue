<template>
  <div class="fondo">
    <v-container>
      <v-form class="login">
        <div><img class="img" src="SYDIGITAL.png" alt="logo" /></div>
        <v-col class="pb-0 px-0">
          <v-text-field
            prepend-inner-icon="email"
            outlined
            solo
            flat
            type="text"
            placeholder="Email"
            color="error"
            v-model="username"
          />
        </v-col>
        <v-col class="py-0 px-0">
          <v-text-field
            outlined
            solo
            flat
            type="password"
            placeholder="Password"
            prepend-inner-icon="vpn_key"
            color="error"
            v-model="password"
            @keyup.enter="login"
          />

          <v-alert dense type="error" outlined v-if="alertLoginShow">
            <span>{{ alertLoginMsg }}</span>
          </v-alert>
        </v-col>

        <v-col class="pa-0">
          <v-btn @click="login" color="error">Login</v-btn>
        </v-col>

        <v-row>
          <v-col class="d-flex justify-end pb-0">
            <registro/>
          </v-col>
        </v-row>
        
      </v-form>

    </v-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from '../plugins/axios';
import registro from "@/components/login/registro.vue";

export default {
  layout: 'layoutnull',
  components:{
    registro
  },
  data() {
    return {
      rules: (value) => !!value || 'Este campo es obligatorio',
      alertError: '',
      dialog: false,
      password: '',
      username: '',
      alertLoginMsg: '',
      alertLoginShow: false,
    }
  },
  methods: {
    ...mapMutations(['SET_AUTH', 'SET_USER']),
    async login() {
      try {
        await axios
          .post('login', { email: this.username, password: this.password })
          .then((res) => {
            let token = res.data.datos
            let user = res.data.data
            this.SET_USER(user)
            this.SET_AUTH(token)
          })
          .catch((error) => {
            console.log(error.response.data.feedback.mensaje)
            this.alertLoginShow = true
            this.alertLoginMsg = error.response.data.feedback.mensaje
          })
      } catch (error) {
        this.alertLoginShow = true
        this.alertLoginMsg = 'Hubo un error al procesar tu solicitud'
        console.log(error)
      }
    },
  },
  watch: {
    alertLoginShow: function () {
      if (this.alertLoginShow) {
        setTimeout(() => {
          this.alertLoginShow = false
        }, 2500)
      }
    },
  },
}
</script>

<style scoped>
.fondo {
  background: whitesmoke;
  width: 100%;
  height: 100%;
}

@media (max-width: 700px) {
  .login {
    align-content: center;
    top: 20vh;
    margin-bottom: 5vh;
    width: 90%;
  }
}
.img {
  width: 400px;
  height: 100%;
}
.login {
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: -webkit-transform 300ms, box-shadow 300ms;
  -moz-transition: -moz-transform 300ms, box-shadow 300ms;
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);
}
.login::before,
.login::after {
  content: '';
  position: absolute;
  width: 800px;
  height: 800px;
  border-top-left-radius: 40%;
  border-top-right-radius: 45%;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 40%;
  z-index: -1;
}
.login::before {
  left: 20%;
  bottom: -130%;
  background-color: rgba(50, 56, 63, 0.15);
  -webkit-animation: wawes 6s infinite linear;
  -moz-animation: wawes 6s infinite linear;
  animation: wawes 6s infinite linear;
}
.login::after {
  left: 25%;
  bottom: -125%;
  background-color: rgba(51, 63, 62, 0.2);
  -webkit-animation: wawes 7s infinite;
  -moz-animation: wawes 7s infinite;
  animation: wawes 7s infinite;
}

@-webkit-keyframes wawes {
  from {
    -webkit-transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes wawes {
  from {
    -moz-transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@keyframes wawes {
  from {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>