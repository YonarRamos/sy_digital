<template>
  <div>
    <v-container>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      dense
      icons-and-text
      centered
      next-icon="arrow_forward_ios"
      prev-icon="arrow_back_ios"
      show-arrows
    >
      <v-tab href="#tab-1">
        Equipos
        <v-icon>dns</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        Lineas
        <v-icon>leaderboard</v-icon>
      </v-tab>
      <v-tab href="#tab-3" >
        Maquinas
        <v-icon>build</v-icon>
      </v-tab>
      <v-tab href="#tab-4">
        Usuarios
        <v-icon>people_alt</v-icon>
      </v-tab>
    </v-tabs>

    </v-container>
    
    <v-tabs-slider></v-tabs-slider>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 4"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <equipos-table 
          v-if="i==1" 
          :equipos="equipos"
          :cliente="clienteName"
          :totalDataMachine="totalDataMachine ? totalDataMachine : totalDataMachine = 10" 
          ref="equipos-table" 
          @click="cargarDatosTablaMachine"
          />

         <lines-table
          v-if="i==2" 
          :lines="lineas"
          :cliente="clienteName"
          :totalDataMachine="totalDataMachine ? totalDataMachine : totalDataMachine = 10" 
          ref="equipos-table" 
          @click="cargarDatosTablaMachine"
          />

          <machine-table 
          v-if="i==3" 
          :maquinas="maquinas"
          :cliente="clienteName"
          :totalDataMachine="totalDataMachine ? totalDataMachine : totalDataMachine = 10" 
          ref="machine-table" 
          @click="cargarDatosTablaMachine"
          />

          <users-table 
          v-if="i==4"
          :cliente="clienteName"
          :usuarios="usuarios" 
          :totalDataUsers="totalDataUsers ? totalDataUsers : totalDataUsers = 10" 
          @click="cargarDatosTablaUsers"
          />

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Equipos_table from '~/components/equipos/equipos_table.vue';
import Machine_table from "~/components/machine/machine_table.vue";
import Users_table from '~/components/users/users_table.vue';
import Lines_table from "~/components/lineas/Lines_table"
import { mapState } from "vuex";
import Cookies from "js-cookie";
import axios from "@/plugins/axios";


  export default {
      middleware: "NOAUTH",
      components:{
          Machine_table,
            Users_table,
            Equipos_table,
            Lines_table
      },
    data () {
      return {
        tab: null,
        totalDataMachine: null,
        totalDataUsers: null,
        page:null,
        perPage:null,
        maquinas:[],
        equipos:[],
        lineas:[],
        usuarios:[]
      }
    },
    methods:{
      async cargarDatosTablaEquipos(e){
        try {
/*             let token = Cookies.get('token');
            e ? this.page = e.page : this.page = 1;
            e ? this.perPage = e.itemsPerPage : this.perPage = 10;

            await axios.get(`company/${this.clienteID}`,
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
          }) */
        } catch (error) {
          console.log(error)
        }
      },
      async cargarDatosTablaMachine(e){
        try {
            let token = Cookies.get('token');
            e ? this.page = e.page : this.page = 1;
            e ? this.perPage = e.itemsPerPage : this.perPage = 10;

            await axios.get(`company/${this.clienteID}`,
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

      async cargarDatosTablaUsers(e){
        try {
            let token = Cookies.get('token');
            e ? this.page = e.page : this.page = 1;
            e ? this.perPage = e.itemsPerPage : this.perPage = 10;

            await axios.get(`user/${this.clienteID}`,
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
    watch:{
      indexTab: function(){
        this.tab = this.indexTab;
      },
      clienteID: function(){
        console.log('cambio el cliente ID');
        this.cargarDatosTablaMachine();
        this.cargarDatosTablaUsers();
      }
    },
    computed:{
      ...mapState(["clienteID","indexTab","clienteName"]),
      clienteComputed(){
        return this.clienteName = this.clienteName.toUpperCase();
    }
  },
  }
</script>
<style>
div.v-slide-group__prev.v-slide-group__prev--disabled{
width: 0px !important;
}
</style>
