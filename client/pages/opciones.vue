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
        Lineas
        <v-icon>leaderboard</v-icon>
      </v-tab>
      <v-tab href="#tab-2" >
        Maquinas
        <v-icon>build</v-icon>
      </v-tab>
      <v-tab href="#tab-3">
        Usuarios
        <v-icon>people_alt</v-icon>
      </v-tab>
    </v-tabs>

    </v-container>
    
    <v-tabs-slider></v-tabs-slider>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
         <lines-table
          v-if="i==1" 
          :cliente="clienteName ? clienteName : ''"
          ref="LinesTable"
          />

          <machine-table 
          v-if="i==2" 
          :cliente="clienteName ? clienteName : ''"
          ref="MachineTable"
          />

          <users-table 
          v-if="i==3"
          :cliente="clienteName ? clienteName : ''"
          ref="UsersTable"
          />

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import MachineTable from "~/components/machine/machine_table.vue";
import UsersTable from '~/components/users/users_table.vue';
import LinesTable from "~/components/lineas/Lines_table"
import { mapState } from "vuex";
import Cookies from "js-cookie";
import axios from "@/plugins/axios";


  export default {
      middleware: "NOAUTH",
      components:{
          MachineTable,
            UsersTable,
            LinesTable
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
    },
    watch:{
      indexTab: function(){
        this.tab = this.indexTab;
      }
    },
    computed:{
      ...mapState(["indexTab","clienteID","clienteName"])
    },

  }
</script>
<style>
div.v-slide-group__prev.v-slide-group__prev--disabled{
width: 0px !important;
}
</style>
