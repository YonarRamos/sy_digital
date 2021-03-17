<template>
  <v-container>
    <v-card color="#EBEDEF">
      <div class="cliente pb-0 mx-3">{{cliente.toUpperCase()}}</div> 
      <v-container class="pt-0">
        <v-row class="ml-0">
          <v-col cols="12" class="d-flex pl-0 pt-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Maquina"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
 
            <v-btn height="48" elevation="0" color="primary" @click="mostrar_add_machine" class="ml-3">
              <v-icon>mdi-plus</v-icon>
            </v-btn>              
          </v-col>
        </v-row>
        <v-data-table
          class="mb-3"
          :headers="headers"
          :items="maquinas"
          :search="search"
          @pagination="getMachineData($event)"
          :disable-sort="true"
          :server-items-length="totalDataMachine"
          :footer-props="{ itemsPerPageOptions: [5, 10, 25] }"
        >
          <template v-slot:[`item.editar`]="{ item }">
            <edit :editar="item.id" />
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <delete :delete="item.id" />
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <add @click="updateTableMachine" ref="addMachine"/>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import { mapState } from "vuex";

import Edit from '~/components/machine/EditMachine';
import Add from '~/components/machine/AddMachine.vue';
import Delete from '~/components/machine/DeleteMachine';

export default {
  props:{
    cliente:{
      type: String
    }
  },
  components: {
    Edit,
    Add,
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
      totalDataMachine:10,
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
    mostrar_add_machine(){
      this.$refs.addMachine.show();
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
        console.log('cambio el cliente ID');
        this.getMachineData();
      }
    },
    computed:{
      ...mapState(["clienteID"])
    },
}
</script>
<style scoped>
  .cliente{
    font-weight:bold;
    color: rgb(193, 198, 204);
    font-family:Roboto, sans-serif;
    font-size: 15px;
    padding-top: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>