<template>
  <div class="fondo" id="content">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card color="#808080" dark>
                    <v-container class="py-0">
                      <v-row>
                        <v-col>
                          <v-card-title> Crear Nueva O.T </v-card-title>
                          <v-card-subtitle>
                            OT_CO_AU_LGBT-01_ME_OT-01115145
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-col class="px-0">
                    <v-combobox
                      v-model="arrayDatosOT.sector"
                      :items="items"
                      label="Sector"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                      :disable-lookup="true"
                    ></v-combobox>
                  </v-col>
                  <v-col class="px-0">
                    <v-combobox
                      v-model="arrayDatosOT.linea"
                      :items="items"
                      label="Linea"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                    ></v-combobox>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                      v-model="menuSolicitud"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedSolicitud"
                      label="Fecha de solicitud"
                      prepend-inner-icon="mdi-calendar"
                      hide-details=""
                      prepend-icon
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    v-model="dateSolicitud"
                    @input="menuSolicitud = false"
                  ></v-date-picker>
                </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="arrayDatosOT.maquina"
                    :items="items"
                    label="Máquina"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu
                      v-model="menuRealizado"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedRealizado"
                      prepend-inner-icon="mdi-calendar"
                      prepend-icon
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      hide-details
                      dense
                      label="Fecha Realizado"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    v-model="dateRealizado"
                    @input="menuRealizado = false"
                  ></v-date-picker>
                </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="arrayDatosOT.serie"
                    :items="items"
                    label="Serie"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="arrayDatosOT.solicitante"
                    outlined
                    dense
                    hide-details
                    placeholder="Solicitante"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  v-model="arrayDatosOT.grupo"
                    outlined
                    dense
                    hide-details
                    placeholder="Grupo"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="arrayDatosOT.ejecucion"
                    outlined
                    dense
                    hide-details
                    placeholder="Ejecución"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="arrayDatosOT.tarea"
                    :items="['M.M.', 'M.E.']"
                    label="Tarea"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="arrayDatosOT.modoIngreso"
                    :items="['1', '2']"
                    label="Modo Ingreso"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-combobox>
                </v-col>
                <v-col class="d-flex justify-end">
                  <div>
                    <v-img
                      src="logo-softys.png"
                      height="42px"
                      width="94px"
                      style="position: relative"
                    >
                    </v-img>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <data-table-ot/>
        </v-col>
      </v-row>
      <v-card>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="success">Guardar O.T</v-btn>
          <btn-pdf :datosEncabezado="arrayDatosOT" :arrayOT="arrayOT" />
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ObservacionesOt from '~/components/common/observacionesOt.vue'
import DataTableOt from '~/components/common/dataTableOT'
import DataTableOT from '~/components/common/dataTableOT.vue'
import BtnPDF from '~/components/common/btnPDF'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  layout: 'layoutitem',
  components: {
    ObservacionesOt,
    DataTableOt,
    DataTableOT,
    BtnPDF
  },
  data(vm) {
    return {
      disable: true,
      dateSolicitud:new Date().toISOString().substr(0, 10),
      dateRealizado:new Date().toISOString().substr(0, 10),
      menuSolicitud: false,
      menuRealizado: false,
      arrayDatosOT:{
        sector:"",
        linea:"",
        maquina:"",
        serie:"",
        grupo:"",
        tarea:"",
        f_solicitud: vm.formatDate(new Date().toISOString().substr(0, 10)),
        f_realizado: vm.formatDate(new Date().toISOString().substr(0, 10)),
        solicitante:"",
        ejecucion:"",
        modoIngreso:""
      },
      menu: false,
      menu1: false,
      items: ['Item 1', 'Item 2', 'Item 3'],
    }
  },
  computed: {
    ...mapState(["arrayOT"]),
      formattedSolicitud () {
        return this.formatDate(this.dateSolicitud)
      },
      formattedRealizado () {
        return this.formatDate(this.dateRealizado)
      },
  },
  mounted() {
    this.showBar = false
  },
  methods: {

    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
  },
}
</script>


<style lang="css" scoped>
.fondo {
  background: #ebedef;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.font-weight-medium {
  size: 1;
}
</style>