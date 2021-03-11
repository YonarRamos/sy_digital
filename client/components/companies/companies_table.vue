<template>
  <v-container>
    <v-card color="#EBEDEF" >
      <div class="cliente pb-0 mx-3">Clientes</div> 
      <v-container class="pt-0">
        <v-row class="ml-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar cliente"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
            
            <add class="px-3 mb-2" @click="getCompanies" />    
        
        </v-row>
          <v-data-table
            :headers="headers"
            :items="companies"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="name"
            class="elevation-1"
        >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="pa-0">
                <machine v-if="selector == 1" :maquinas="maquinas" :totalDataMachine="totalDataMachine" :cliente="item.name"/>
                <users v-if="selector == 2" :usuarios="usuarios" :totalDataUsers="totalDataUsers" :cliente="item.name"/>
              </td>
            </template>

            <template v-slot:[`item.machine`]="{ item }">
              <a @click="clickMachine(item, item.id)">Ver detalle</a>
            </template>

            <template v-slot:[`item.users`]="{ item }">
              <a @click="clickUsers(item, item.id)">Ver detalle</a>
            </template>

            <template v-slot:[`item.editar`]="{ item }">
              <edit :editar="item" />
            </template>

            <template v-slot:[`item.eliminar`]="{ item }">
              <delete :delete="item" />
            </template>

        </v-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
import axios from '@/plugins/axios';

import Add from "~/components/companies/AddCompany.vue";
import Delete from "~/components/companies/DeleteCompany.vue";
import machine from "~/components/companies/machine";
import users from "~/components/companies/users";

export default {
  props:{
    maquinas:{
      type: Array,
      required:true
    },
    totalDataMachine:{
      type: Number,
      required: true
    },
    cliente:{
      type:String
    }
  },
  components: {
    Add,
    machine,
    users,
    Delete
  },
  data() {
    return {
        selector:0,
        totalDataMachine:0,
        totalDataUsers:0,
        maquinas:[],
        usuarios:[],
        expanded:[],
        companies:[],
        totalDataCompanies:0,
        machine:{
        name: "",
        section_id: "",
        company_id:"",
        description: "",
      },
      search: '',
      company_id: "systelec",
      headers: [
        { text: 'Nombre', value: 'name', align: 'start', sortable: false },
        { text: 'Descripcion', value: 'description', sortable: false },
        { text: 'Equipos', value: 'equipos', align: 'center', sortable: false },
        { text: 'Lineas', value: 'lineas', align: 'center', sortable: false },
        { text: 'Maquinas', value: 'machine', align: 'center', sortable: false },
        { text: 'Usuarios', value: 'users', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    clickMachine(value, clienteID) {
      this.selector = 1;
      if(this.expanded.length > 0){
        this.expanded = []
      }else{
      this.expanded.push(value)
      this.cargarDatosTablaMachine(null,clienteID);
      }
    },
    clickUsers(value, clienteID) {
      this.selector = 2;
      if(this.expanded.length > 0){
        this.expanded = []
      }else{
      this.expanded.push(value)
      this.cargarDatosTablaUsers(null,clienteID);
      }
    },
    getCompanies(){
        try {
            let token = Cookies.get('token');
            axios.get('company',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res)=>{
                console.log(res.data.data.data);
                this.companies = res.data.data.data;
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargarDatosTablaMachine(e, clienteID){
        try {
            let token = Cookies.get('token');
            e ? this.page = e.page : this.page = 1;
            e ? this.perPage = e.itemsPerPage : this.perPage = 10;

            await axios.get(`company/${clienteID}`,
              {
                headers: { Authorization: `Bearer ${token}`},
                params: {
                page: this.page ,
                perPage: this.perPage
                }
              })
          .then((res)=>{
            console.log('Maquinas:', res.data.data[0].machine);
            this.maquinas = res.data.data[0].machine;  
            this.totalDataMachine = res.data.data[0].machine.length;
          })
        } catch (error) {
          console.log(error)
        }
      },
      async cargarDatosTablaUsers(e, clienteID){
        try {
            let token = Cookies.get('token');
            e ? this.page = e.page : this.page = 1;
            e ? this.perPage = e.itemsPerPage : this.perPage = 10;

            await axios.get(`user/${clienteID}`,
              {
                headers: { Authorization: `Bearer ${token}`},
                params: {
                page: this.page ,
                perPage: this.perPage
                }
              })
          .then((res)=>{
            console.log('Users:', res.data.data);
            this.usuarios = res.data.data;
            this.totalDataUsers = this.usuarios.length;
          })
        } catch (error) {
          console.log(error)
        }
      }
  },
  mounted(){
      this.getCompanies();
      this.companies.push({name:"Prueba"})
  }
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