<template>
<div>
  <div>
    <v-btn height="48" elevation="0" color="primary" @click="dialog=true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
  <v-row>
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
                      <strong>Agregar Cliente</strong>
                    </v-toolbar>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                            v-model="company.name" 
                            outlined
                            placeholder="Nombre de  la compañia"
                            color="error"
                            class="mt-5"
                            :rules="[rules.required]"
                            ></v-text-field>

                        <v-textarea
                        v-model="company.description"
                            outlined
                            placeholder="Descripción"
                            color="error"
                            :rules="[rules.required]"
                            ></v-textarea>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn
                        text
                        @click="submid"
                        color='success'
                        :loading="loading"
                        :disabled="loading"
                        >    
                          <span v-if="text">GUARDAR</span>
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
  </v-row >
</div>
</template>
 
<script>
import axios from '@/plugins/axios';
import Cookies from "js-cookie";

export default {
    data(){
        return{
          company:
          {
            name: "",
            description: ""
          },
            text:true,
            loader: null,
            iconOk:false,
            iconCancel:false,
            loading:false,
            dialog:false,
            valid:true,
            rules: {
                    required: v => !!v || "Este campo es obligatorio"
                    },
        }
    },
    methods:{
       async submid(){
          try {
            
            if(this.$refs.form.validate()){
              let token = Cookies.get('token');
              this.text = false;
              this.loading = true;
              this.loader = 'loading'

              await axios.
                post("company", this.company,{
              headers: { Authorization: `Bearer ${token}`},
              })
                .then((res)=>{
                  console.log(res);
                  this.loader = null  
                  this.loading = false;
                  this.iconOk = true;
                  this.$emit('click');
                  this.$refs.form.reset();
                  setTimeout(()=>{
                  this.iconOk = false;
                  this.text = true;
                  },3000) 
                })
                .catch((error)=>{
                  console.log(error);
                  this.loader = null  
                  this.loading = false;
                  this.iconCancel = true;
                  setTimeout(()=>{
                  this.iconCancel = false;
                  this.text = true;
                  },4000) 
                })
 
            }
          } catch (error) {
              console.log(error);
          }
        },
        hide(){
            this.dialog = false;
            this.$refs.form.reset();
        }
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