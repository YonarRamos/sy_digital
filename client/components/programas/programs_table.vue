<template>
  <v-card color="#EBEDEF">
    <v-container class="pt-0">
      <div class="cliente pb-0 mx-3">Programas</div> 

      <v-row>
        <v-col cols="6" class="pt-1">
            <v-card
              width="100%"
            >
              <v-col class="d-flex py-0 px-1 mb-0">
                <v-file-input
                v-model="newProgram"
                label="Cargar Programas"
                class="py-1"
                height="20"
                prepend-inner-icon="add_to_queue"
                prepend-icon
                multiple
                outlined
                dense
                hide-details
                ></v-file-input>
                <v-btn :disabled="newProgram ? false : true" width="20" height="40" elevation="0" color="success" @click="agregarPrograma" class="mt-1 ml-2">
                  <v-icon size="30">check</v-icon>
                </v-btn>
              </v-col>
            </v-card>
        </v-col>

        <v-col cols="6" class="pt-1 pl-0 mb-0">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>

      </v-row>

      <v-row>
        <v-col class="pt-0">
          <v-data-table
          ref="programTable"
          :headers="headers"
          :items="programas"
          :search="search"
          >
            <template v-slot:[`item.descargar`]="{ item }">
              <v-icon color="primary" small @click="descargarPrograma(item.id)">mdi-download</v-icon>
            </template>

            <template v-slot:[`item.editar`]="{ item }">
              <editar-programa :id="item.id" :EditProgram="EditProgram" :programas="programas"/>
            </template>

            <template v-slot:[`item.delete`]="{ item }">
              <v-icon color="error" small @click="eliminarPrograma(item.id)">delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import EditarPrograma from "~/components/programas/EditarPrograma.vue";
 export default {
   components:{
     EditarPrograma
   },
    data () {
      return {
        newProgram: null,
        EditProgram:null,
        search: '',
        headers: [
          { text: 'id', value: 'id',align: 'center', sortable: false },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Creado', value: 'fecha' },
          { text: 'Descargar', value: 'descargar',align: 'center', sortable: false },
          { text: 'Editar', value: 'editar',align: 'center', sortable: false },
          { text: 'Eliminar', value: 'delete',align: 'center', sortable: false },
        ],
        programas: [],
      }
    },
    methods:{
      agregarPrograma(){
        console.log(this.newProgram);
        for (const item of this.newProgram) {
         this.programas.push(
          {
            nombre: item.name,
            fecha: new Date().toISOString().substr(0, 10),
            id:this.programas.length+1
          }
        );         
        }
        this.newProgram=null;
      },
      eliminarPrograma(id){
        this.programas.splice(parseInt(id)-1,1);
        this.programas.forEach((element, index)=>{
          element.id = index+1;
        });
      },
      descargarPrograma(id){
        alert(`descargando progrma ${id}`);
      }
    }
  }
</script>

<style>
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