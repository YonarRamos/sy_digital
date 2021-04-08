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
      {{arrayOT}}
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
                          <v-card-title> Crear Nueva O.T </v-card-title>
<!--                           <v-card-subtitle>
                            OT_CO_AU_LKRT-01_ME_OT-01115145
                          </v-card-subtitle> -->
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-col class="px-0">
                    <v-autocomplete
                      v-model="datosOT.status_id"
                      :items="itemStatus"
                      item-text="type"
                      item-value="type"
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
                      v-model="datosOT.line_id"
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
                    v-model="datosOT.machine_id"
                    :items="itemMachine"
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
                    v-model="datosOT.sector_id"
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
                    v-model="datosOT.task_id"
                    :items="itemTasks"
                    item-text="type_task"
                    item-value="type_task"
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
        <v-col cols="12">
          <data-table-ot @click="$refs.obs.clearFiles()" :arrayOT="arrayOT" />
        </v-col>

        <v-col cols="12" align-self="center">
          <v-card width="100%" class="d-flex pa-2" color="#808080">
            <observaciones-ot class="img" ref="obs"  @filesImg="imgArr = $event" v-model="imgArr"/>
            <carousel :items="imgArr"/>
          </v-card>
        </v-col>

      </v-row>
      
      <v-card >
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

import InfoModal from '~/components/common/infoModal.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import ObservacionesOt from '~/components/common/observacionesOt.vue';
import Carousel from "~/components/common/carousel.vue";
import DataTableOt from '~/components/common/dataTableOT';
import DataTableOT from '~/components/common/dataTableOT.vue';
import BtnPDF from '~/components/common/btnPDF';

export default {
  layout: 'layoutitem',
  components: {
    ObservacionesOt,
    DataTableOt,
    DataTableOT,
    BtnPDF,
    InfoModal,
    Carousel
  },
  data(vm) {
    return {
      imgArr:[],
      itemTasks:[],
      itemStatus:[],
      itemMachine:[],
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
        solicitante: 'julio',
        ejecutor: 'systelec',
        ingreso: null,
        sector_id: 1,
        line_id: 1,
        machine_id: 1,
        grupo: 'pruebaOT',
        task_id:null,
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
    this.showBar = false
    console.log(this.user.company_id);
    this.getTasks();
    this.getStatus();
    this.getMachines();
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
    async guardarOT() {
      try {
        if(this.$refs.form.validate()){
          //this.overlay = true;
          let token = Cookies.get('token');
          this.datosOT.company_id = this.user.company_id;
          this.datosOT.observations.push(...this.arrayOT) //Este Array se llena desde el componente DataTableOT
          let fechasArr = [];
          for (const item of this.frecuencia) {
            fechasArr.push({ fecha: item })
          }

          let formData = new FormData();
              formData.append(`solicitante`,this.datosOT.solicitante);
              formData.append(`ejecutor`,this.datosOT.ejecutor);
              formData.append(`ingreso`,this.datosOT.ingreso.name);
              formData.append(`sector_id`,this.datosOT.sector_id.id);
              formData.append('line_id',this.datosOT.line_id.id);
              formData.append('machine_id',this.datosOT.machine_id.id);
              formData.append(`grupo`,this.datosOT.grupo);
              formData.append(`type_task_id`,this.datosOT.task_id.id);
              formData.append(`status_id`,this.datosOT.status_id.id);
              formData.append(`company_id`,this.user.company_id);

              this.arrayOT.forEach((item,i)=>{
                formData.append(`observation[${i}].sections`, item.sections);
                formData.append(`observation[${i}].title`, item.title);
                formData.append(`observation[${i}].real`, item.real);
                formData.append(`observation[${i}].estado`, item.estado);
                formData.append(`observation[${i}].observations`, item.observations);
              })
              this.imgArr.forEach((item,i)=>{ 
                formData.append(`img[${i}]`,item);                 
              })
              fechasArr.forEach((item,i)=>{ 
                formData.append(`fechas[${i}]`,JSON.stringify(item));                 
              })
              console.log('data:',formData);

          await axios
            .post('ot',formData,
              {
                headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type':'multipart/form-data'
                },
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
        this.overlay = false;
        console.log('Error POST guardarOT', error)
        this.toggleInfoModal({
          dialog: true,
          msj: error,
          titulo: 'Agregar OT',
          alertType: 'error',
        })
      }
    },
    async getTasks(){
      let token = Cookies.get('token');
      await axios.get('task',
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('tasks:', res.data.data);
        this.itemTasks = res.data.data;
      });     
    },
    async getStatus(){
      let token = Cookies.get('token');
      await axios.get('OTstatus',
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('status:', res.data.data);
        this.itemStatus = res.data.data;
      });     
    },
    async getMachines(){
      let token = Cookies.get('token');
      await axios.get('machine',
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('machine:', res.data.data);
        this.itemMachine = res.data.data;
      });     
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