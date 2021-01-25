<template>
  <div class="fondo">
    <div class="form">
      <v-form>
        <div class="pl-10"><v-img class="login" src="softys_logo.png" /></div>
        <v-container>
          <v-row
            align="center"
            justify="center"
            class="lightbox white--text pa-4 fill-height formulario"
          >
            <v-col cols="12" md="12">
              <v-text-field 
              :rules="[rules]" 
              v-model="username" 
              :counter="50" 
              label="Email"
              required
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                :rules="[rules]"
                v-model="password"
                :counter="20"
                type="password"
                label="Contraseña"
                required
                @keyup.enter="login()"
              ></v-text-field>
            </v-col>
            <v-alert
                dense
                type="error"
                outlined
                v-if="alertLoginShow"
              >
                {{alertLoginMsg}}
            </v-alert>
          </v-row>
          <div class="mb-5 mt-0 ingresar">
            <v-btn width="100%" small color="#3ba1da"  dark @click="login">Ingresar</v-btn>
          </div>
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
body{
    background-color: #295382
};
.create {
  font-size: 3vh;
  color: white;
}
.ingresar {
  width: 100%;
}

.fondo {
  background:#295382;

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
  width: 280px;
  height: 100%;
  margin: 0px auto;
  margin-top: 0px;
  top: 20px;
}

.container {
  align-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;
  position: relative;
  top: 10vh;
  width: 80vh;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 10vh;
}
@media (max-width: 700px) {
  .container {
    align-content: center;
    top: 5vh;
    margin-bottom: 5vh;
    width: 80%;
  }
}
</style>
<style>