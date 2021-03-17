<template>
  <v-container>
    <v-card color="#EBEDEF">
      <div class="cliente pb-0 mx-3">{{cliente.toUpperCase()}}</div> 
      <v-container class="pt-0">
        <v-row class="ml-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar Equipo"
              background-color="white"
              single-line
              hide-details
              solo
              flat
            ></v-text-field>
            
            <add class="px-3 mb-2" @click="updateTableMachine" />
        
        </v-row>
        <v-data-table
          class="mb-3"
          :headers="headers"
          :items="equipos"
          :search="search"
          :disable-sort="true"
          :server-items-length="totalDataMachine"
          @pagination="updateTableMachine($event)"
          :footer-props="{ itemsPerPageOptions: [5, 10, 25] }"
        >
          <template v-slot:[`item.editar`]='{ item }'>
            <edit :editar="item" />
          </template>

          <template v-slot:[`item.eliminar`]='{ item }'>
            <delete :delete="item" />
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Add from "~/components/equipos/AddEquipo.vue";
import Edit from "~/components/equipos/EditEquipo";
import Delete from "~/components/equipos/DeleteEquipo";

export default {
  props:{
    equipos:{
      type: Array,
      required:true
    },
    totalDataMachine:{
      type: Number,
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
        { text: 'Sección', value: 'section_id', align: 'center', sortable: false },
        { text: 'Estatus', value: 'status_machine_id', align: 'center', sortable: false },
        { text: 'Actualizado', value: 'last_update', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    updateTableMachine(e){
      this.$emit('click', e)
    }
  },
  mounted(){
    this.equipos.push({name:"Prueba"})
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