<template>
  <div class="fondo">
    <v-container>
      <v-row>
        <v-col sm="4" lg="3" class="d-flex justify-center" v-for="(item, i) in opciones" :key="i">
          <v-hover v-slot="{ hover }" open-delay="100">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover, color: '#295382' }"
                height="155"
                width="155"
                style="cursor: pointer"
                color="#295382"
              >
                <v-card-text class="d-flex justify-center pb-0">
                  <v-icon color="white" size="80"> {{item.icon}} </v-icon>
                </v-card-text>

                <v-card-title class="pt-0 d-flex justify-center white--text"
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
        {titulo:'Avisos', icon:'warning'},
        {titulo:'O.T', icon:'warning'},
        {titulo:'Consultas', icon:'build'},
        {titulo:'Acciones', icon:'search'},
        {titulo:'Acciones', icon:'widgets'}
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
a{
  text-decoration: none;
}
.fondo {
  background: #EBEDEF;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.font-weight-medium {
  size: 1;
}
</style>