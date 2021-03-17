<template>
<div>
  <div>
      <v-btn @click="dialog = true" color="error" text> Agregar Sector </v-btn>
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
                      <strong>Agregar Sector</strong>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col>
                              <v-text-field
                              v-model="sector.name" 
                              outlined
                              placeholder="Nombre"
                              hide-details
                              color="error"
                              class="mt-5"
                              :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-autocomplete
                              v-model="sector.company_id"
                                :items="empresas"
                                item-text="name"
                                return-object
                                :menu-props="{ maxHeight: '400' }"
                                placeholder="Asociar a la siguiente empresa"
                                label="Compañia"
                                outlined
                                hide-details
                                class="mt-5"
                                color="error"
                                :rules="[rules.required]"
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                                <v-textarea
                                v-model="sector.description"
                                outlined
                                placeholder="Descripción"
                                color="error"
                                :rules="[rules.required]"
                                ></v-textarea>                              
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
                        @click="agregarSector"
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

export default {
  components:{
    addMachine
  },
    data(){
        return{
          sector:{
            name: "",
            company_id:"",
            description: ""
          },
          company_name:"",
          empresas:[],
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
    methods:{
       async agregarSector(){
          try {
            this.sector.company_id = this.sector.company_id.id;
            console.log('Sector a guardar:', this.sector)
            if(this.$refs.form.validate()){
              let token = Cookies.get('token');
              this.text = false;
              this.loading = true;
              this.loader = 'loading'

              await axios.
                post("sector", this.sector,{
              headers: { Authorization: `Bearer ${token}`},
              })
                .then((res)=>{
                  console.log(res);
                  this.loader = null   
                  this.loading = false;
                  this.iconOk = true;
                  this.company_name = this.sector.name;
                  setTimeout(()=>{
                  this.iconOk = false;
                  this.text = true;
                  this.$refs.form.reset();
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
        async getCompanies(){
          try {
            await axios.get('companyName',{
            })
            .then((res)=>{
              //console.log('company Sec:', res.data.data)
              this.empresas =  res.data.data;
            })
          } catch (error) {
            console.log(error);
          }
        },
        hide(){
            this.dialog = false;
            this.$emit('click', this.company_name);
            this.$refs.form.reset();
        },
        mostrar_add_machine(){
          this.$refs.addMachine.show();
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