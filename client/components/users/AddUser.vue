<template>
  <div>
        <div>
          <v-btn height="48" elevation="0" color="primary" @click="dialog=true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-col cols="auto" v-if="dialog">
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
                v-model = "dialog"
            >
                <template>
                <v-card>
                    <v-toolbar
                    color="error"
                    dark
                    >
                        <strong>Nuevo Usuario</strong>
                        <v-spacer></v-spacer>
                        <img src="SYDIGITAL_white2.png" alt="logo" style="width:200px;">
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>

                            <v-text-field
                              v-model="user.username" 
                              outlined
                              placeholder="Nombre de Usuario"
                              color="error"
                              class="mt-5"
                              :rules="[rules.required]"
                            ></v-text-field>

                            <v-text-field
                              v-model="user.email"
                              outlined
                              placeholder="Email"
                              color="error"
                              class="mt-3"
                              :rules="[rules.required, rules.email]"
                            ></v-text-field>

                            <v-select
                              v-model="user.company_id"
                              :items="empresas"
                              label="Empresa"
                              outlined
                              class="mt-3"
                              color="error"
                              :rules="[rules.required]"
                            ></v-select>

                            <v-select
                              v-model="user.rol_id"
                              :items="roles"
                              label="rol"
                              outlined
                              class="mt-3"
                              color="error"
                              :rules="[rules.required]"
                            ></v-select>

                            <v-text-field
                              v-model="user.password"
                              type="password" 
                              outlined
                              placeholder="Password"
                              color="error"
                              class="mt-3"
                              :rules="[rules.required]"
                             ></v-text-field>

                            <v-text-field
                            v-model="user.confirm_password"
                              type="password" 
                              outlined
                              placeholder="Confirmar Password"
                              color="error"
                              class="mt-3"
                              :rules="[rules.required]"
                            ></v-text-field>

                        </v-form>

                        <v-alert dense :type="statusRegisterAlert" outlined v-if="alertRegistroShow">
                          <span>{{ alertRegistroMsg }}</span>
                        </v-alert>

                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn                       
                        text
                        @click="submid"
                        color='success'
                        :loading="loading"
                        :disabled="loading"
                        >    
                          <span v-if="text">REGISTRAR</span>
                          <v-icon large v-if="iconOk" dark>
                            check_circle
                          </v-icon>
                          <v-icon color="error" read large v-if="iconCancel" dark>
                            cancel
                          </v-icon>
                        </v-btn>

                        <v-btn
                        text
                        @click="hide"
                        color='error'
                        >Close</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
        </v-col>
    </div >
</template>
 
<script>
import axios from '@/plugins/axios';

export default {
    data(){
        return{
            statusRegisterAlert:'Success',
            alertRegistroMsg: '',
            alertRegistroShow: false,
            text:true,
            loader: null,
            iconOk:false,
            iconCancel:false,
            loading:false,
            dialog:false,
            empresas:[],
            companies: {
              'Systelec': 1, 
              'Softys': 2,
              'Jhonson': 3
              },
            roles:['Operador','Administrador'],
            roles_id:{
              'Operador' : parseInt(0), 
              'Administrador' : parseInt(1)
            },
            valid:true,
            rules: {
                    required: v => !!v || "Este campo es obligatorio",
                    email: v => /.+@.+/.test(v) || 'Por favor introduzca un email valido',
                    },
            user:{
              username:"",
              email:"",
              password:null,
              confirm_password:null,
              company_id:null,
              rol_id:null
            }
        }
    },
    methods:{
      async submid(){
          try {
            if(this.$refs.form.validate()){
              this.text = false;
              this.loading = true;
              this.loader = 'loading';
              this.user.company_id = this.companies[this.user.company_id];
              this.user.rol_id = this.roles_id[this.user.rol_id];
              console.log(this.user);
              await axios.post('register', this.user)
              .then((res)=>{
                console.log(res);
                this.loader = null  
                this.loading = false;
                this.iconOk = true;     
                this.alertRegistroMsg = res.data.data.message
                this.alertRegistroShow = true;
                this.$refs.form.reset();
                setTimeout(()=>{
                this.alertRegistroShow = false;
                this.iconOk = false;
                this.text = true;
                },3000)
              })
              .catch((error)=> {
                this.loader = null  
                this.loading = false;
                console.log(error);
                this.iconCancel = true
                this.alertRegistroMsg = error.message;
                this.statusRegisterAlert = 'error';
                this.alertRegistroShow = true
                setTimeout(()=>{
                this.alertRegistroShow = false;
                this.iconCancel = false;
                this.text = true;
                },5000)
              });
            }
          }catch (error) {
            console.log(error);
            this.loader = null  
            this.loading = false;
            this.iconCancel = true
            this.alertRegistroMsg = error.message;
            this.statusRegisterAlert = 'error';
            this.alertRegistroShow = true
            setTimeout(()=>{
            this.alertRegistroShow = false;
            this.iconCancel = false;
            this.text = true;
            },5000)
          }
        },
        hide(){
            this.dialog = false;
            this.$refs.form.reset();
        },
        async getCompanies(){
          try {
            await axios.get('companyName',{
            })
            .then((res)=>{
              for (const item of res.data.data) {
                this.empresas.push(item.name);
              }
            })
          } catch (error) {
            console.log(error);
          }
        }
    },
    mounted(){
      this.getCompanies();
    }
}
</script>

<style scoped>
    a {
    text-decoration: none;
    color: #383838;
    font-size: 14px;
    }
    a:hover{
    color:#FF5252
    }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>