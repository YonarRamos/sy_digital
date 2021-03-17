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
                    <v-autocomplete
                      v-model="datosOT.sector"
                      :items="items"
                      label="Sector"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                      :disable-lookup="true"
                    ></v-autocomplete>
                  </v-col>
                  <v-col class="px-0">
                    <v-autocomplete
                      v-model="datosOT.linea"
                      :items="items"
                      label="Linea"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                    ></v-autocomplete>
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
                    v-model="datosOT.f_solicitud"
                    @input="menuSolicitud = false"
                  ></v-date-picker>
                </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.maquina"
                    :items="items"
                    label="Máquina"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-autocomplete>
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
                    v-model="datosOT.f_realizado"
                    @input="menuRealizado = false"
                  ></v-date-picker>
                </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.serie"
                    :items="items"
                    label="Serie"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="datosOT.solicitante"
                    outlined
                    dense
                    hide-details
                    placeholder="Solicitante"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  v-model="datosOT.grupo"
                    outlined
                    dense
                    hide-details
                    placeholder="Grupo"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="datosOT.ejecucion"
                    outlined
                    dense
                    hide-details
                    placeholder="Ejecución"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.tarea"
                    :items="['M.M.', 'M.E.']"
                    label="Tarea"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.modoIngreso"
                    :items="['1', '2']"
                    label="Modo Ingreso"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" class="pt-0 mt-0">
                    <small style="color:gray;">Frecuencia:</small>
                    <v-row>
                      <v-col cols="3" class="pt-0 pr-0">
                        <v-checkbox
                        v-model="diario"
                        label="Diario"
                        hide-details
                        dense
                        class="pt-0 mt-0"
                        ></v-checkbox>
                        <v-checkbox
                        v-model="semanal"
                        label="Semanal"
                        hide-details
                        dense
                        class="pt-0 mt-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="3" class="pt-0">
                        <v-checkbox
                          v-model="mensual"
                          label="Mensual"
                          hide-details
                          dense
                          class="pt-0 mt-0"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="anual"
                          label="Anual"
                          hide-details
                          class="pt-0 mt-0"
                          dense
                        ></v-checkbox>                        
                      </v-col>

                      <v-col class="pt-0">
                        <v-menu
                          ref="menu"
                          v-model="menuHasta"
                          :close-on-content-click="true"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dateHasta"
                              label="hasta"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                              outlined
                              hide-details
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dateHasta"
                            no-title
                            scrollable
                            @change="definirFrecuencia"
                          >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <data-table-ot :arrayOT="arrayOT" />
        </v-col>
      </v-row>
      <v-card>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="guardarOT" color="success">Guardar O.T</v-btn>
          <btn-pdf :datosEncabezado="datosOT" :arrayOT="arrayOT" />
        </v-card-actions>
      </v-card>
    </v-container>
    <info-modal/>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import InfoModal from '~/components/common/infoModal.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ObservacionesOt from '~/components/common/observacionesOt.vue'
import DataTableOt from '~/components/common/dataTableOT'
import DataTableOT from '~/components/common/dataTableOT.vue'
import BtnPDF from '~/components/common/btnPDF'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment';

export default {
  layout: 'layoutitem',
  components: {
    ObservacionesOt,
    DataTableOt,
    DataTableOT,
    BtnPDF,
    InfoModal
  },
  data(vm) {
    return {
      arrayOT:[],
      disable: true,
      menuSolicitud: false,
      menuRealizado: false,
      diario:false,
      semanal:false,
      mensual:false,
      anual:false,
      menu: false,
      menu1: false,
      menuHasta:false,
      frecuencia:[],
      dateHasta:new Date().toISOString().substr(0, 10),
      items: ['Item 1', 'Item 2', 'Item 3'],
        datosOT:{
          id:"",
          sector:"",
          linea:"",
          maquina:"",
          serie:"",
          grupo:"",
          tarea:"",
          f_solicitud: new Date().toISOString().substr(0, 10),
          f_realizado: new Date().toISOString().substr(0, 10),
          solicitante:"",
          ejecucion:"",
          modoIngreso:"",
          data:[]
        },
    }
  },
  computed: {
    ...mapState(["ots","infoModal"]),
      formattedSolicitud () {
        return this.formatDate(this.datosOT.f_solicitud)
      },
      formattedRealizado () {
        return this.formatDate(this.datosOT.f_realizado)
      },
  },
  mounted() {
    this.showBar = false;
  },
  methods: {
    ...mapMutations(["toggleInfoModal","ocultarInfoModal","cargarOTS"]),

    definirFrecuencia(){
      this.frecuencia=[];
      console.log(this.dateHasta);
      this.frecuencia.push(this.datosOT.f_solicitud);

      if(this.diario){
        while(moment(this.datosOT.f_solicitud).format() < moment(this.dateHasta).format()){
          this.datosOT.f_solicitud = moment(this.datosOT.f_solicitud).add(1,'day').format().slice(0,10);
          this.frecuencia.push(this.datosOT.f_solicitud);
          console.log('Array FRecuencia:', this.frecuencia);
        }
      }

      if(this.semanal){
        while(moment(this.datosOT.f_solicitud).format() < moment(this.dateHasta).format()){
          this.datosOT.f_solicitud = moment(this.datosOT.f_solicitud).add(1,'week').format().slice(0,10);
          this.frecuencia.push(this.datosOT.f_solicitud);
          console.log('Array FRecuencia:', this.frecuencia);
        }
        this.frecuencia.splice(this.frecuencia.length-1,1);//eliminamos la semana que se agrega fuera de fecha
      }

      if(this.mensual){
        while(moment(this.datosOT.f_solicitud).format() < moment(this.dateHasta).format()){
          this.datosOT.f_solicitud = moment(this.datosOT.f_solicitud).add(1,'month').format().slice(0,10);
          this.frecuencia.push(this.datosOT.f_solicitud);
          console.log('Array FRecuencia:', this.frecuencia);
        }
      }

      if(this.anual){
        while(moment(this.datosOT.f_solicitud).format() < moment(this.dateHasta).format()){
          this.datosOT.f_solicitud = moment(this.datosOT.f_solicitud).add(1,'year').format().slice(0,10);
          this.frecuencia.push(this.datosOT.f_solicitud);
          console.log('Array FRecuencia:', this.frecuencia);
        }
      }

    },
    guardarOT(){
      this.datosOT.data.push(...this.arrayOT);//Este Array se llena desde el componente DataTableOT
      if(this.frecuencia.length > 0){
         for (const item of this.frecuencia) {
          this.datosOT.f_solicitud = item;
          this.datosOT.id = `OT_0${this.ots.length + 1}_ME_AR-${moment(this.datosOT.f_solicitud)}`;
          this.cargarOTS({
            id:this.datosOT.id,
            sector:this.datosOT.sector,
            linea:this.datosOT.linea,
            maquina:this.datosOT.maquina,
            serie:this.datosOT.serie,
            grupo:this.datosOT.grupo,
            tarea:this.datosOT.tarea,
            f_solicitud:item,
            f_realizado:this.datosOT.f_realizado,
            solicitante:this.datosOT.solicitante,
            ejecucion:this.datosOT.ejecucion,
            modoIngreso:this.datosOT.modoIngreso,
            data:this.arrayOT
          });
        }
      }else{
        this.cargarOTS(this.datosOT);
      }
      
      this.toggleInfoModal({
        dialog: true,
        msj: `OT Agregada`,
        titulo: "Agregar OT",
        alertType: "success",
      });
    },
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