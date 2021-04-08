<template>
  <div class="fondo" id="content">
    <v-dialog v-model="overlay" persistent>
      <div style="display:flex;box-shadow:none !important;">
              <v-progress-circular
              :size="70"
              :width="7"
              color="white"
              indeterminate
            ></v-progress-circular>
            <p class="estatus mt-2">
              Cargando OT...
            </p>
      </div>
    </v-dialog>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container fluid>
             <v-form ref="form" v-model="valid" lazy-validation> 
              <v-row>
                <v-col cols="12" md="6">
                  <v-card color="#808080" dark>
                    <v-container class="py-0">
                      <v-row>
                        <v-col>
                          <v-card-title> Editar O.T </v-card-title>
                          <v-card-subtitle>
                            {{datosOT.id}}
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-col class="px-0">
                    <v-autocomplete
                      v-model="datosOT.status"
                      :items="[{'id':1,'name':'aceptada'},{'id':2,'name':'pendiente'},{'id':3,'name':'realizada'}]"
                      item-text="name"
                      item-value="name"
                      return-object
                      label="Estatus"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                      :disable-lookup="true"
                      :rules="[rules.required]"
                    ></v-autocomplete>
                  </v-col>
                  <v-col class="px-0">
                    <v-autocomplete
                      v-model="datosOT.line"
                      :items="[{'id':1,'name':'linea nueva sysa'},{'id':2,'name':'linea de pruebas'}]"
                      item-text="name"
                      item-value="name"
                      return-object
                      label="Linea"
                      outlined
                      dense
                      hide-details
                      style="cursor: pointer"
                      :rules="[rules.required]"
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
                        hide-details
                        prepend-icon
                        outlined
                        disabled
                        dense
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      v-model="f_solicitud"
                      @input="menuSolicitud = false"
                      disabled
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.machine"
                    :items="[{'id':1,'name':'maquina L100'},{'id':2,'name':'maquina L200'}]"
                    item-text="name"
                    item-value="name"
                    return-object
                    label="Máquina"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.sector"
                    :items="[{'id':1,'name':'Taller Sysa'},{'id':2,'name':'Sector de pruebas'}]"
                    item-text="name"
                    item-value="name"
                    return-object
                    label="Sector"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="datosOT.solicitante"
                    outlined
                    dense
                    hide-details
                    placeholder="Solicitante"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="datosOT.grupo"
                    outlined
                    dense
                    hide-details
                    placeholder="Grupo"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="datosOT.ejecutor"
                    outlined
                    dense
                    hide-details
                    placeholder="Ejecución"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.task"
                    :items="[{'id':1,'name':'M.M'},{'id':2,'name':'M.E'}]"
                    item-text="name"
                    item-value="name"
                    return-object
                    label="Tarea"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="datosOT.ingreso"
                    :items="[{'id':1,'name':'Modo 1'},{'id':2,'name':'Modo 2'}]"
                    item-text="name"
                    item-value="name"
                    return-object
                    label="Modo Ingreso"
                    outlined
                    dense
                    hide-details
                    style="cursor: pointer"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" class="py-0 mt-0">
                  <small style="color: gray">Frecuencia:</small>
                  <v-row>
                    <v-col cols="12" md="6" class="pt-0 pr-0">
                      <v-radio-group v-model="frecuenciaRadio" row hide-details>
                        <v-radio
                          label="Diario"
                          color="indigo"
                          value="diario"
                          class="pt-0 mt-0"
                        ></v-radio>
                        <v-radio
                          label="Semanal"
                          color="success"
                          value="semanal"
                          class="pt-0 mt-0"
                        ></v-radio>
                        <v-radio
                          label="Mensual"
                          color="orange"
                          value="mensual"
                          class="pt-0 mt-0"
                        ></v-radio>
                        <v-radio
                          label="Anual"
                          color="info"
                          value="anual"
                          class="pt-0 mt-0"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="6">
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
                            @change="definirFrecuencia"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateHasta"
                          no-title
                          scrollable
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              </v-form>
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
    <info-modal />
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Cookies from 'js-cookie'
import { mapMutations, mapState } from 'vuex'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'

import InfoModal from '~/components/common/infoModal.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ObservacionesOt from '~/components/common/observacionesOt.vue'
import DataTableOt from '~/components/common/dataTableOT'
import DataTableOT from '~/components/common/dataTableOT.vue'
import BtnPDF from '~/components/common/btnPDF'

export default {
  layout: 'layoutitem',
  components: {
    ObservacionesOt,
    DataTableOt,
    DataTableOT,
    BtnPDF,
    InfoModal,
  },
  data() {
    return {
      paramsID:null,
      arrayOT: [],
      overlay: false,
      disable: true,
      menuSolicitud: false,
      menuRealizado: false,
      diario: false,
      semanal: false,
      mensual: false,
      anual: false,
      menu: false,
      menu1: false,
      menuHasta: false,
      frecuenciaRadio:'',
      frecuencia: [],
      dateHasta: new Date().toISOString().substr(0, 10),
      items: [1, 2, 3, 4, 5],
      f_solicitud: new Date().toISOString().substr(0, 10),
      datosOT: {
        solicitante: '',
        ejecutor: '',
        ingreso: null,
        sector: null,
        line: null,
        machine: 1,
        grupo: '',
        task:'',
        status_id: 1,
        company_id: null,
        observations: [],
        fechas: [],
      },
      valid:true,
      rules: {
        required: v => !!v || "Este campo es obligatorio"
      },
    }
  },
  computed: {
    ...mapState(['ots', 'infoModal', 'user']),
    formattedSolicitud() {
      return this.formatDate(this.f_solicitud)
    },
    formattedRealizado() {
      return this.formatDate(this.datosOT.f_realizado)
    },
  },
  mounted() {
    this.showBar = false;
    this.paramsID = this.$route.params.id;
    this.getOts();
  },
  methods: {
    ...mapMutations(['toggleInfoModal', 'ocultarInfoModal', 'cargarOTS']),

    definirFrecuencia() {
      this.frecuencia = [];
      this.frecuencia.push(this.f_solicitud);

      if (this.frecuenciaRadio == 'diario') {
        while (
          moment(this.f_solicitud).format() < moment(this.dateHasta).format()
        ) {
          this.f_solicitud = moment(this.f_solicitud)
            .add(1, 'day')
            .format()
            .slice(0, 10)
          this.frecuencia.push(this.f_solicitud)
          console.log('Array FRecuencia:', this.frecuencia)
        }
      }

      if (this.frecuenciaRadio == 'semanal') {
        while (
          moment(this.f_solicitud).format() <
          moment(this.dateHasta).format()
        ) {
          this.f_solicitud = moment(this.f_solicitud)
            .add(1, 'week')
            .format()
            .slice(0, 10)
          this.frecuencia.push(this.f_solicitud)
          console.log('Array FRecuencia:', this.frecuencia)
        }
        this.frecuencia.splice(this.frecuencia.length - 1, 1) //eliminamos la semana que se agrega fuera de fecha
      }

      if (this.frecuenciaRadio == 'mensual') {
        while (
          moment(this.f_solicitud).format() <
          moment(this.dateHasta).format()
        ) {
          this.f_solicitud = moment(this.f_solicitud)
            .add(1, 'month')
            .format()
            .slice(0, 10)
          this.frecuencia.push(this.f_solicitud)
          console.log('Array FRecuencia:', this.frecuencia)
        }
      }

      if (this.frecuenciaRadio == 'anual') {
        while (
          moment(this.f_solicitud).format() <
          moment(this.dateHasta).format()
        ) {
          this.f_solicitud = moment(this.f_solicitud)
            .add(1, 'year')
            .format()
            .slice(0, 10)
          this.frecuencia.push(this.f_solicitud)
          console.log('Array FRecuencia:', this.frecuencia)
        }
      }
    },
    async getOts(){
      let token = Cookies.get('token');
      await axios.get(`ot/${this.paramsID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('ots:', res.data.data[0].OT);
        this.datosOT = res.data.data[0].OT;
      });
    },
    async guardarOT() {
      try {
        if(this.$refs.form.validate()){
          this.overlay = true;
          let token = Cookies.get('company_id')
          this.datosOT.company_id = this.user.company_id
          this.datosOT.observations.push(...this.arrayOT) //Este Array se llena desde el componente DataTableOT
          let fechasArr = []
          for (const item of this.frecuencia) {
            fechasArr.push({ fecha: item })
            this.datosOT.id = `OT_0${this.ots.length + 1}_ME_AR-${moment(
              this.datosOT.f_solicitud
            )}`
          }
          console.log('datos:', {
            solicitante: this.datosOT.solicitante,
            ejecutor: this.datosOT.ejecutor,
            ingreso: this.datosOT.ingreso.name,
            sector_id: this.datosOT.sector.id,
            line_id: this.datosOT.line.id,
            machine: this.datosOT.machine.id,
            grupo: this.datosOT.grupo,
            task:this.datosOT.task.id,
            status_id: this.datosOT.status_id,
            company_id: this.user.company_id,
            observations: this.arrayOT,
            fechas: fechasArr
          })
          await axios
            .post('ot',
              {
                solicitante: this.datosOT.solicitante,
                ejecutor: this.datosOT.ejecutor,
                ingreso: this.datosOT.ingreso.name,
                sector_id: this.datosOT.sector.id,
                line_id: this.datosOT.line.id,
                machine: this.datosOT.machine.id,
                grupo: this.datosOT.grupo,
                task:this.datosOT.task.id,
                status_id: this.datosOT.status_id,
                company_id: this.user.company_id,
                observations: this.arrayOT,
                fechas: fechasArr
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(() => {
              this.overlay = false;
              this.toggleInfoModal({
                dialog: true,
                msj: `OT Agregada`,
                titulo: 'Agregar OT',
                alertType: 'success',
              })
            })
        }
      } catch (error) {
        this.overlay = true;
        console.log('Error POST guardarOT', error)
        this.toggleInfoModal({
          dialog: true,
          msj: error,
          titulo: 'Agregar OT',
          alertType: 'error',
        })
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  watch:{
    frecuenciaRadio:function(){
      this.definirFrecuencia();
    },
    dateHasta:function(){
      this.definirFrecuencia();
    }
  }
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

.estatus{
  color: white;
  font-size: 50px;
  text-shadow: 0 0 3px #ffffff, 0 0 5px #0000FF;
  background: transparent;
  border: none;
}
</style>