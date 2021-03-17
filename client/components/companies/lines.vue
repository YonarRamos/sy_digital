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
            
            <add class="px-3 mb-2" @click="getLinesData" />    
        
        </v-row>

        <v-data-table
          style="background:#F9F9F9"
          class="mb-3"
          :headers="headers"
          :items="lineas"
          :search="search"
          :disable-sort="true"
          :server-items-length="totalDataLines"
          @pagination="getLinesData($event)"
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
import axios from '@/plugins/axios';
import Cookies from "js-cookie";
import { mapState } from "vuex";

import Edit from '~/components/lineas/EditLine.vue';
import Delete from "~/components/lineas/DeleteLine.vue";
import Add from "~/components/lineas/AddLine.vue";

export default {
  props:{
    clienteID:{
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
      token: Cookies.get('token'),
      lines:{
        name: "",
        section_id: "",
        company_id:"",
        description: "",
      },
      lineas:[],
      totalDataLines:10,
      search: '',
      company_id: "systelec",
      headers: [
        { text: 'Nombre', value: 'name', align: 'start', sortable: false },
        { text: 'Descripcion', value: 'description', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false},
      ],
    }
  },
  methods:{
    updateTableMachine(e){
      this.$emit('click', e)
    },
   async getLinesData() {
     console.log('test:', this.test);
      try {
        await axios
        .get(`line/${this.clienteID}`,{
          headers: { Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          this.lineas = res.data.data;
          this.totalDataLines = this.lineas.length;
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch:{
    clienteID: function(){
      this.getLinesData();
    }
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