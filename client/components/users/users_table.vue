<template>
  <v-container>
    <v-card color="#EBEDEF" >
      <div class="cliente pb-0 mx-3">{{cliente.toUpperCase()}}</div> 
      <v-container class="pt-0">
        <v-row class="ml-0">

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar en Usuarios"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
            
            <add class="px-3 mb-2" @click="$emit('click')" />  
        
        </v-row>

        <v-data-table
          class="mb-3"
          :headers="headers"
          :items="usuarios"
          :search="search"
          @pagination="getUsersData($event)"
          :disable-sort="true"
          :server-items-length="totalDataUsers"

          :footer-props="{ itemsPerPageOptions: [1, 10, 25] }"
        >
          <template v-slot:[`item.rol`]="{ item }">
            {{ item.rol | rolParse}}
          </template>
          <template v-slot:[`item.editar`]="{ item }">
            <edit :id="item.id" />
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <delete :id="item.id" />
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import { mapState } from "vuex";

import Add from '@/components/users/AddUser.vue';
import Edit from '@/components/users/EditUser.vue';
import Delete from '@/components/users/DeleteUser';
         /*  @pagination="$emit('click')" */
export default {
  props:{
    cliente:{
      type: String
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
      user:{
        username:"",
        email:"",
        password:null,
        confirm_password:null,
        company_id:null,
        rol_id:null
      },
      usuarios:[],
      totalDataUsers:10,
      search: '',
      company_id: "",
      headers: [
        { text: 'Name', value: 'name', align: 'start', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Rol', value: 'rol', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false}
      ],
    }
  },
  methods:{
   async getUsersData(){
      try {
        await axios
        .get(`user/${this.clienteID}`,{
          headers: { Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          this.usuarios = res.data.data.data;
          this.totalDataUsers = this.usuarios.length;
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  filters:{
    rolParse(value){
      return value == 1 ? 'Administrador' : 'Operador';
    }
  },
    watch:{
      clienteID: function(){
        console.log('cambio el cliente ID');
        this.getUsersData();
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