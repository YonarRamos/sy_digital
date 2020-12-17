<template>
  <v-container>
<!--     <v-card-title class="py-1 px-1">
      {{ tabRef == 'tab-1' ? 'Equipos' : tabRef == 'tab-2' ? 'Lineas' : 'Ordenes de Trabajo' }}
    </v-card-title> -->
    <v-card color="#EBEDEF">
      <v-container>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="tabRef == 'tab-1' ? 'Buscar en Equipos' : tabRef == 'tab-2' ? 'Buscar Lineas' : 'Buscar Ordenes de Trabajo'"
          background-color="white"
          single-line
          hide-details
          solo
          flat
          class="mb-3"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="tabRef == 'tab-1' ? equipos : tabRef == 'tab-2' ? lineas : ot"
          :search="search"
          :disable-sort="true"
        >
          <template v-slot:[`item.editar`]="{ item }">
            <edit :editar="item" />
          </template>

          <template v-slot:[`item.agregar`]="{ item }">
            <add :agregar="item" />
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <delet :delete="item" />
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import edit from '@/components/common/editar'
import add from '@/components/common/agregar'
import delet from '@/components/common/eliminar'

export default {
  props: {
    tabRef: {
      type: String,
      required: true,
    },
  },
  components: {
    edit,
    add,
    delet,
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Código', value: 'codigo', align: 'start', sortable: false },
        { text: 'Descripcion', value: 'descripcion', sortable: false },
        { text: 'Aregar', value: 'agregar', align: 'center', sortable: false },
        { text: 'Editar', value: 'editar', align: 'center', sortable: false },
        {text: 'Eliminar', value: 'eliminar', align: 'center', sortable: false,},
      ],
      equipos: [
        {
          codigo: 'Equipos Pruebas',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 6.0,
          editar: 24,
          eliminar: 4.0,
        },        
        {
          codigo: 'Equipos Pruebas',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 6.0,
          editar: 24,
          eliminar: 4.0,
        },
      ],
      lineas: [
        {
          codigo: 'Lineas Prueba',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 'Agregar lineas',
          editar: 24,
          eliminar: 4.0,
        },
        {
          codigo: 'Lineas Prueba',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 'Agregar lineas',
          editar: 24,
          eliminar: 4.0,
        }
      ],
      ot: [
        {
          codigo: 'Ordenes de Trabajo',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 'Agregar lineas',
          editar: 24,
          eliminar: 4.0
        },
        {
          codigo: 'Ordenes de Trabajo',
          descripcion: 'Lorem ipsum Dolor',
          agregar: 'Agregar lineas',
          editar: 24,
          eliminar: 4.0
        }
      ],
    }
  },
}
</script>