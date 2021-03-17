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
            
            <add class="px-3 mb-2" @click="clickMachine" />    
        
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
                <machine v-if="selector == 1" :cliente="item.name" :clienteID="item.id" ref="machine"/>
                <users v-if="selector == 2" :cliente="item.name" :clienteID="item.id" ref="users"/>
                <lines v-if="selector == 3" :cliente="item.name" :clienteID="item.id" ref="lines"/>
              </td>
            </template>

            <template v-slot:[`item.machine`]="{ item }">
              <a @click="clickMachine(item, item.id)">Ver detalle</a>
            </template>

            <template v-slot:[`item.users`]="{ item }">
              <a @click="clickUsers(item, item.id)">Ver detalle</a>
            </template>

            <template v-slot:[`item.lineas`]="{ item }">
              <a @click="clickLines(item, item.id)">Ver detalle</a>
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
import { mapState } from "vuex";

import Add from "~/components/companies/AddCompany.vue";
import Delete from "~/components/companies/DeleteCompany.vue";
import Edit from "~/components/companies/EditCompany.vue";
import machine from "~/components/companies/machine";
import users from "~/components/companies/users";
import lines from "~/components/companies/lines.vue";


export default {
  props:{
    cliente:{
      type:String
    }
  },
  components: {
    Add,
    machine,
    users,
    Delete,
    Edit,
    lines
  },
  data() {
    return {
        token: Cookies.get('token'),
        selector:0,
        totalDataMachine:0,
        totalDataUsers:0,
        maquinas:[],
        usuarios:[],
        lineas:[],
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
        /* { text: 'Equipos', value: 'equipos', align: 'center', sortable: false }, */
        { text: 'Lineas', value: 'lineas', align: 'center', sortable: false },
        { text: 'Maquinas', value: 'machine', align: 'center', sortable: false },
        { text: 'Usuarios', value: 'users', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    clickMachine(value) {
      this.selector = 1;
      if(this.expanded.length > 0){
        this.expanded = []
      }else{
      this.expanded.push(value);
      }
    },
    clickUsers(value) {
      this.selector = 2;
      if(this.expanded.length > 0){
        this.expanded = []
      }else{
      this.expanded.push(value);
      }
    },
    clickLines(value) {
      this.selector = 3;
      if(this.expanded.length > 0){
        this.expanded = []
      }else{
      this.expanded.push(value);
      }
    },
      async getCompany(){
      try {
        let token = Cookies.get('token');
        await axios.get('companyname',{
              headers: { Authorization: `Bearer ${token}`}
              })
        .then((res)=>{
          console.log('company', res.data.data)
          this.companies = res.data.data;
          this.totalDataCompanies = this.companies.length;
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted(){
    this.getCompany();
  },
  computed:{
      ...mapState(["clienteID"]),
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