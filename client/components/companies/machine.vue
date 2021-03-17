<template>
  <v-container style="background:#F5F6F8;box-shadow: inset 0 0 20px #EBEDEF;">
     <!--  <div class="cliente pb-0 mx-3">{{cliente.toUpperCase()}}</div>  -->
     <!--  <v-container class="pt-0"> -->
        <v-row class="ml-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar en Maquinas"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
            
            
            <div class="mx-3 mb-2">
              <v-btn height="48" elevation="0" color="primary" @click="mostrarAdd()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>        

        </v-row>
        <v-data-table
          style="background:#F9F9F9"
          class="mb-3 detalle"
          :headers="headers"
          :items="maquinas"
          :search="search"
          :disable-sort="true"
          :server-items-length="totalDataMachine"
          @pagination="getMachineData($event)"
          :footer-props="{ itemsPerPageOptions: [5, 10, 25] }"
        >
          <template v-slot:[`item.editar`]="{ item }">
            <edit :editar="item" />
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <delete :delete="item" />
          </template>
        </v-data-table>
    <add class="px-3 mb-2" @click="updateTableMachine" ref="add"/>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import { mapState } from "vuex";

import Add from '~/components/machine/AddMachine.vue';
import Edit from '~/components/machine/EditMachine';
import Delete from '~/components/machine/DeleteMachine.vue';


export default {
  props:{
    clienteID:{
      type: Number,
      required: true
    },
    cliente:{
      type:String
    }
  },
  components: {
    Add,
    Edit,
    Delete
  },
  data() {
    return {
      token: Cookies.get('token'),
      machine:{
        name: "",
        section_id: "",
        company_id:"",
        description: "",
      },
      maquinas:[],
      totalDataMachine: 10,
      search: '',
      company_id: "systelec",
      headers: [
        { text: 'Nombre', value: 'name', align: 'start', sortable: false },
        { text: 'Descripción', value: 'description', sortable: false },
        { text: 'Sector', value: 'name', align: 'center', sortable: false },
        { text: 'Estatus', value: 'status_machine', align: 'center', sortable: false },
        { text: 'Línea', value: 'line', align: 'center', sortable: false },
        { text: 'Actualizado', value: 'last_update', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    updateTableMachine(e){
      this.$emit('click', e)
    },
    mostrarAdd(){
      this.$refs.add.show();
    },
   async getMachineData(){
      try {
        await axios
        .get(`machine/${this.clienteID}`,{
          headers: { Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          this.maquinas = res.data.data.data;
          this.totalDataMachine = this.maquinas.length;
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch:{
    clienteID: function(){
      this.getMachineData();
    }
  }
}
</script>
<style scoped>
table{
  transition: display 4s;
}
table:active{
  display: none ;
}
  .cliente{
    font-weight:bold;
    color:#EBEDEF;
    font-family:Roboto, sans-serif;
    font-size: 15px;
    padding-top: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>