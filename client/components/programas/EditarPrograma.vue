<template>
  <div>
    <v-icon 
        color="warning" 
        small 
        @click="dialog=true"
        >
        mdi-pencil
        </v-icon>

    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card color="#C1C6CC">
          <v-col class="d-flex py-0 px-1 mb-0">
            <v-file-input
            background-color="white"
            v-model="EditProgram"
            label="Reemplazar Programa"
            class="py-1"
            height="20"
            prepend-inner-icon="add_to_queue"
            prepend-icon
            outlined
            dense
            hide-details
            ></v-file-input>
            <v-btn :disabled="EditProgram ? false : true" 
            width="20" 
            height="40" 
            elevation="0" 
            color="success" 
            @click="editarPrograma(id)" 
            class="mt-1 ml-2">
              <v-icon size="30">check</v-icon>
            </v-btn>

            <v-btn
            width="20" 
            height="40" 
            elevation="0" 
            color="error" 
            @click="dialog=false" 
            class="mt-1 ml-2">
              <v-icon size="30">cancel</v-icon>
            </v-btn>
          </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props:{
    id:{
      type: Number,
      required: true
    },
  EditProgram:{
    type:Object,
    required:true
  },
  programas:{
    type:Array,
    required:true
    }
  },
  data(){
    return{
      dialog:false
    }
  },
  methods:{
    show(){
      this.dialog = true
    },
    editarPrograma(id){
        if(this.EditProgram){
          this.programas[parseInt(id)-1].nombre = this.EditProgram.name;
          this.dialog = false;
        }
        this.programas.forEach((element, index)=>{
          element.id = index+1;
          element.nombre = element.nombre;
        });
      },
  }
}
</script>

<style>

</style>