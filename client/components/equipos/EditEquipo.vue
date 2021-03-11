<template>
<div>
  <div>
      <v-icon color="gray" @click="dialog=true">mdi-pencil</v-icon>
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
                      <strong>Editar Equipo</strong>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-text-field
                          v-model="line.name" 
                          outlined
                          placeholder="Nombre"
                          color="error"
                          class="mt-5"
                          :rules="[rules.required]"
                          ></v-text-field>

<!--                           <v-row>
                            <v-col>
                              <v-select
                                :items="maquinas_disponibles"
                                :menu-props="{ maxHeight: '400' }"
                                label="Máquina"
                                multiple
                                placeholder="Asociar máquinas"
                                persistent-hint
                                outlined
                                class="mt-5 mx-0"
                                color="error"
                                :rules="[rules.required]"
                              ></v-select>
                            </v-col>

                            <v-col cols="2" class="d-flex align-center">
                              <v-btn class="mb-3" text color="primary" @click="mostrar_add_machine">Asociar Línea<v-icon>mdi-plus</v-icon> </v-btn>
                            </v-col>
                            <add-machine ref="addMachine"/>
                            </v-row> -->
                            
                          <v-textarea
                          v-model="line.description"
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
                        @click="hide"
                        color='error'
                        >Close
                        </v-btn>
                        
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
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
        </v-col>
  </v-row >
</div>
</template>
 
<script>
import addMachine from "~/components/machine/AddMachine.vue";
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import { mapState } from 'vuex';

export default {
  components:{
    addMachine
  },
    data(){
        return{
          line:
          {
            name: "",
            description: ""
          },
            maquinas_disponibles:['1', '2','4','6'],
            text:true,
            loader: null,
            iconOk:false,
            iconCancel:false,
            loading:false,
            dialog:false,
            sec:['1', '2','4','6'],
            empresas:['Systelec', 'Softys','Jhonson'],
            valid:true,
            rules: {
                    required: v => !!v || "Este campo es obligatorio"
                    },
        }
    },
    computed:{
      ...mapState(['clienteID'])
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
                post("machine", this.machine,{
              headers: { Authorization: `Bearer ${token}`},
              })
                .then((res)=>{
                  console.log(res);
                  this.loader = null  
                  this.loading = false;
                  this.iconOk = true;
                  this.$emit('click', this.machine);
                  setTimeout(()=>{
                  this.iconOk = false;
                  this.text = true;
                  },4000) 
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
              this.loader = null  
              this.loading = false;
              this.iconCancel = true;
              setTimeout(()=>{
              this.iconCancel = false;
              this.text = true;
              },3000) 
          }
        

        },
        hide(){
            this.dialog = false;
            this.$refs.form.reset();
        },
        mostrar_add_machine(){
          this.$refs.addMachine.show();
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