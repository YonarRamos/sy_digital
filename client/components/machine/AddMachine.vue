<template>
<div>
<!--   <div>
    <v-btn height="48" elevation="0" color="primary" @click="dialog=true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div> -->
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
                      <strong>Agregar Máquina</strong>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                v-model="machine.name" 
                                outlined
                                hide-details
                                placeholder="Nombre"
                                color="error"
                                class="mt-5"
                                :rules="[rules.required]"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-autocomplete
                                v-model="machine.line_id"
                                :items="lines"
                                item-text="name"
                                return-object
                                :menu-props="{ maxHeight: '400' }"
                                placeholder="Asociar a la siguiente Línea"
                                label="Línea"
                                outlined
                                hide-details
                                class="mt-5"
                                color="error"
                                :rules="[rules.required]"
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="8">
                              <v-autocomplete
                              v-model="machine.sector_id"
                              :items="sections"
                              item-text="name"
                              return-object
                              label="Sección"
                              outlined
                              class="mt-5"
                              color="error"
                              :rules="[rules.required]"
                              hide-details
                              ></v-autocomplete>
                            </v-col>
                            <v-col cols="4" class="d-flex align-center mt-4">
                              <add-seccion @click="update" />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-textarea
                              v-model="machine.description"
                              outlined
                              placeholder="Descripción"
                              hide-details
                              no-resize
                              color="error"
                              class="mt-5"
                              :rules="[rules.required]"
                              />                            
                            </v-col>
                          </v-row>
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
                        @click="agregarMaquina"
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
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import AddSeccion from "~/components/machine/AddSeccion.vue";
import { mapState } from 'vuex';

export default {
  components:{
    AddSeccion
  },
    data(){
        return{
          token: Cookies.get('token'),
          machine:
          {
            name: "",
            line_id: "",
            sector_id:"",
            description: ""
          },
          lines:[],
          sections:[],
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
      update(company){
        console.log("Company:", company)
        this.getSections();
        this.machine.sector_id = company;
      },
       async agregarMaquina(){
          try {
            this.machine.line_id =this.machine.line_id.id;
            this.machine.sector_id = this.machine.sector_id.id;
            if(this.$refs.form.validate()){
              this.text = false;
              this.loading = true;
              this.loader = 'loading'

              await axios.
                post("machine", this.machine,{
              headers: { Authorization: `Bearer ${this.token}`},
              })
                .then((res)=>{
                  console.log(res);
                  this.loader = null  
                  this.loading = false;
                  this.iconOk = true;
                  this.$emit('click');
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
        async getLines(){
          try {
            await axios.get(`line/${this.clienteID}`,{
              headers: { Authorization: `Bearer ${this.token}` }
            })
            .then((res)=>{
              console.log('line Sec:', res)
              this.lines = res.data.data;
            })
          } catch (error) {
            console.log(error);
          }
        },
        async getSections(){
          try {
            await axios.get(`sector/${this.clienteID}`,{
              headers: { Authorization: `Bearer ${this.token}` }
            })
            .then((res)=>{
              //console.log('line Sec:', res)
              this.sections = res.data.data;
            })
          } catch (error) {
            console.log(error);
          }
        },
        hide(){
            this.dialog = false;
            this.$refs.form.reset();
        },
        show(){
          this.dialog = true;
          this.getLines();
          this.getSections();
        }
    },
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