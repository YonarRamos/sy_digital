<template>
  <div class="fondo" style="background:#2f2f2f;">
    <div class="form">
      <v-form>
        <div class="pl-2"><v-img class="login" src="SYDIGITAL_RED.png" /></div>
        <v-container>
          <v-row
            align="center"
            justify="center"
            class="lightbox white--text pa-4 fill-height formulario"
          >
       <v-col cols="12" md="12">
              <v-text-field 
              dense
              :rules="[rules]" 
              v-model="username" 
              hide-details
              required
              prepend-inner-icon="email"
              placeholder="Email"
              outlined
              dark
              >
              </v-text-field>
       </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                :rules="[rules]"
                dense
                dark
                v-model="password"
                hide-details
                type="password"
                placeholder="password"
                required
                prepend-inner-icon="vpn_key"
                outlined
                @keyup.enter="login()"
              ></v-text-field>
            </v-col>
            <v-alert
                dense
                type="error"
                outlined
                v-if="alertLoginShow"
              >
                <span class="white--text">{{alertLoginMsg}}</span>
            </v-alert>
          </v-row>
          <v-col cols="12" md="12">
          <div class="mb-5 mt-0 ingresar">
            <v-btn width="100%" small color="error"  dark @click="login">Ingresar</v-btn>
          </div>
          </v-col>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from "../plugins/axios";

export default {
layout: "layoutnull",
  data() {
    return {
      rules: value => !!value || 'Este campo es obligatorio',
      alertError:"",
      dialog:false,
      password: "",
      username: "",
      alertLoginMsg:"",
      alertLoginShow:false
    };
  },
  methods:{
    ...mapMutations(["SET_AUTH","SET_USER"]),
   async login(){
     try {
        await axios 
          .post("login", { email: this.username, password: this.password })
          .then(res => {
          let token = res.data.datos;
          let user = res.data.data;
          this.SET_USER(user);
          this.SET_AUTH(token);
        }).catch(error =>{
          console.log(error.response.data.feedback.mensaje);
          this.alertLoginShow = true
          this.alertLoginMsg = error.response.data.feedback.mensaje;
        })

     } catch (error) {
          this.alertLoginShow = true
          this.alertLoginMsg = "Hubo un error al procesar tu solicitud";
     }
    }
  },
  watch:{
        alertLoginShow : function() {
      if(this.alertLoginShow){
        setTimeout(() => {
          this.alertLoginShow = false
        }, 2500);
      }
    }
  }
}
</script>

<style scoped>
.fondo {
  background:#2f2f2f;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.img {
  position: fixed;
  width: 100%;
  height: 100vh;
}
.form {
  z-index: 100;
}
.login {
  width: 480px;
  height: 100%;
  margin: 0px auto;
  margin-top: 0px;
  top: 150px;
}

.container {
  align-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;
  position: relative;
  top: 25vh;
  width: 70vh;
  border-radius: 10px;
  margin-bottom: 10vh;
}
@media (max-width: 700px) {
  .container {
    align-content: center;
    top: 25vh;
    margin-bottom: 5vh;
    width: 80%;
  }
}
</style>
