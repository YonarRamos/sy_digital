<template>
  <div>
    <v-icon @click="dialog=true" color="error"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline white--text" style="background:#F65B4B;">
          Eliminar Máquina
        </v-card-title>

        <v-card-subtitle class="mt-5 Subtitle 1">
            <strong><h3>¿Está seguro que desea eliminar la línea {{id}}?</h3></strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog=false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteMachine">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal msj una vez Eliminado-->
    <v-dialog
      v-model="alertShow"
      persistent
      max-width="350">
      <v-card>
        <v-card-title class="headline pb-0">
          <v-alert width="325" outlined :type="alertType"> 
            {{alertMsg}}
          </v-alert>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="hide"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Cookies from 'js-cookie'

export default {
  props:{
    id:{
    type: Number,
   /*  required:true */
    },
    name:{
      type: String
    }
  },
  data(){
    return{
      dialog:false,
      alertShow:false,
      alertType:"",
      alertMsg:""
    }
  },
  methods:{
   async deleteMachine() {
      try {
        const token = Cookies.get('token');
        await axios.delete(`maquina/${this.id}`, {
          headers: { Authorization: `Bearer ${token}`
          },
        })
        .then(()=>{
          this.dialog = false;
          this.alertType="success";
          this.alertMsg="Maquina Eliminada"
          this.alertShow = true;
        });
      } catch (error) {
        this.alertType="error";
        this.alertMsg="Ha ocurrido un error al intentar procesar tu solicitud"
        this.alertShow = true;
        console.log('Error al intentar procesar la solicitud:',error);
      }
    },
    hide(){
      this.alertShow = false;
      this.$emit('click');
    }
  }
}
</script>

<style>
</style>