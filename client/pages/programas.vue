<template>
  <v-container>
    <v-row>
      <v-col>
          <programs-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Programs_table from "~/components/programas/programs_table.vue";
export default {
  components:{
    Programs_table
  },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>