<template>
  <v-container>
    <v-toolbar-title
      v-if="$refs.calendar"
      class="text-uppercase text-center font-weight-medium grey--text"
    >
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small> mdi-chevron-left </v-icon>
      </v-btn>

      {{ $refs.calendar.title }}
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="250px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="focus"
              label="Evaluar desde"
              readonly
              v-bind="attrs"
              v-on="on"
              prepend-inner-icon="mdi-calendar"
              hide-details
              prepend-icon
              outlined
              dense
              color="grey darken-2"
              width="100"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="focus"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-btn
          outlined
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
          min-height="40px"
        >
          Hoy
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined icon color="primary" v-bind="attrs" v-on="on" class="mx-3" to="/ot/generar-ot">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar Nueva OT</span>
        </v-tooltip>

        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
              min-height="40px"
            >
              <span>{{type == 'day' ? 'Día' : type == 'week' ? 'Semana' : 'Mes'}}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Día</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mes</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon  :to="`ot/editar-ot/${selectedEvent.index}`">
                  <v-icon >mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn text color="secondary" @click="selectedOpen = false" >
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    menu: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      const events = []
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let [i, item] of this.ots.entries()) {
        events.push({
          name: `OT_0${i + 1}_ME_AR-${Date.now()}`,
          start: item.f_solicitud,
          end: item.f_solicitud,
          color: this.colors[this.rnd(0, this.colors.length - 1)], 
          details:`          
          <strong>sector:</strong> ${item.sector}<br>
          <strong>linea:</strong> ${item.linea}<br>
          <strong>Maquina:</strong> ${item.maquina}<br>
          <strong>serie:</strong> ${item.serie}<br>
          <strong>grupo:</strong> ${item.grupo}<br>
          <strong>tarea:</strong> ${item.tarea}<br>
          <strong>Fecha de solicitud:</strong> ${item.f_solicitud}<br>
          <strong>Fecha Realizado:</strong> ${item.f_realizado}<br>
          <strong>Solicitante:</strong> ${item.solicitante}<br>
          <strong>Ejecucion:</strong> ${item.ejecucion}<br>
          <strong>Modo de Ingreso:</strong> ${item.modoIngreso}<br>
          `,
          index: i
        })
      }

      /*      for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          }) 
        }*/

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  computed: {
    ...mapState(['ots']),
  },
}
</script>