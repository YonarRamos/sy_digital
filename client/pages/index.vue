<template>
  <div class="fondo">
    <v-container>
      <v-row>
        <v-col sm="4" lg="3" class="d-flex justify-center" v-for="(item, i) in opciones" :key="i">
      <v-hover
        v-slot="{ hover }"
        open-delay="200"
      >
              <v-card
                :class="{ 'on-hover': hover }"
                flat
                height="155"
                width="155"
                class="tarjeta"
                elevation="2"
                :to="item.url"
              >
                <v-card-text class="d-flex justify-center pb-0">
                  <v-icon size="80"> {{item.icon}} </v-icon>
                </v-card-text>
                <v-card-title class="pt-0 d-flex justify-center"
                  >{{item.titulo}}</v-card-title
                >
              </v-card>
      </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
export default {
  middleware: "NOAUTH",
  data(){
    return{
      opciones:[
        {titulo:'Avisos', icon:'report_problem', url:'#'},
        {titulo:'O.T', icon:'fact_check', url:'/ot'},
        {titulo:'Consultas', icon:'build'},
        {titulo:'Acciones', icon:'search'},
        {titulo:'Programas', icon:'widgets', url:'/programas'}
      ],
    }
  },
  computed: {
    ...mapState(["dialogPassword"])
  },
  methods: {
    ...mapMutations(['toggleDialogPassword'])
  }
}
</script>

<style lang="css" scoped>
.tarjeta{
  cursor: pointer; 
  color: grey;
  background: #EAEAEA;
}

.tarjeta:hover{
  border:solid #FF8888;

}

a{
  text-decoration: none;
}
.fondo {
  background: white;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.font-weight-medium {
  size: 1;
}
</style>

