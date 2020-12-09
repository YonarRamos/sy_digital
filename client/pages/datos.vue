<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="white"
      centered
      dense
      icons-and-text
    >
    <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-1">
        Equipos
        <v-icon>build</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Lineas
        <v-icon>leaderboard</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        O.T
        <v-icon>sticky_note_2</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <data-table :tabRef="tab"></data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import dataTable from "@/components/dataTable";
import DataTable from '~/components/dataTable.vue';
  export default {
      components:{
          dataTable
      },
    data () {
      return {
        tab: null
      }
    },
  }
</script>

<style>

</style>