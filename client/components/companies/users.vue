<template>
  <v-container style="background:#F5F6F8;box-shadow: inset 0 0 20px #EBEDEF;">
<!--     <v-card color="#EBEDEF" >
      <div class="cliente pb-0 mx-3">{{cliente.toUpperCase()}}</div>  -->
      <v-container class="pt-0" color="#C1C6CC">
        <v-row class="ml-0">

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Usuario"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
            
            <add class="px-3 mb-2" @click="updateTableUsers" />    
        
        </v-row>

        <v-data-table
          style="background:#F9F9F9"
          class="mb-3"
          :headers="headers"
          :items="usuarios"
          :search="search"
          :disable-sort="true"
          :server-items-length="totalDataUsers"
          @pagination="updateTableUsers($event)"
          :footer-props="{ itemsPerPageOptions: [1, 10, 25] }"
        >
          <template v-slot:[`item.rol`]="{ item }">
            {{ item.rol | rolParse}}
          </template>
          <template v-slot:[`item.editar`]="{ item }">
            <edit :editar="item" />
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <delete :delete="item" />
          </template>
        </v-data-table>
      </v-container>
   <!--  </v-card> -->
  </v-container>
</template>

<script>
import Add from '~/components/users/AddUser';
import Edit from '~/components/users/EditUser';
import Delete from '~/components/users/DeleteUser';

export default {
  props:{
    usuarios:{
      type: Array,
      required:true
    },
    totalDataUsers:{
      type: Number,
      required: true
    },
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
      user:{
        username:"",
        email:"",
        password:null,
        confirm_password:null,
        company_id:null,
        rol_id:null
      },
      search: '',
      company_id: "systelec",
      headers: [
        { text: 'Username', value: 'username', align: 'start', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Empresa', value: 'company_name', align: 'center', sortable: false },
        { text: 'Rol', value: 'rol', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    updateTableUsers(e){
      this.$emit('click', e)
    },
  },
  filters:{
    rolParse(value){
      return value == 1 ? 'Administrador' : 'Operador';
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
  .cliente{
    font-weight:bold;
    color: #EBEDEF;
    font-family:Roboto, sans-serif;
    font-size: 15px;
    padding-top: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>