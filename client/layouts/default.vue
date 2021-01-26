<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >

<v-list>
      <v-list-group
        :value="false"
        prepend-icon="build"
        color="error"
      >
        <template v-slot:activator>
          <v-list-item-title>Equipos</v-list-item-title>
        </template>

        <v-list-group
          :value="false"
          no-action
          sub-group
          color="error"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Maquinas</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in maquinas"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
          color="error"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Lineas</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in lineas"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>

            <v-list-group
        :value="false"
        prepend-icon="description"
        color="error"
      >
        <template v-slot:activator>
          <v-list-item-title>Extras</v-list-item-title>
        </template>

        <v-list-group
          :value="false"
          no-action
          sub-group
          color="error"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in usuarios"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

                <v-list-group
          :value="true"
          no-action
          sub-group
          color="error"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Hall OT</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in ot"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>

      <password/>
    </v-navigation-drawer>

<v-app-bar :clipped-left="clipped" fixed app color="#808080">
      <!-- <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />-->
      <v-btn @click.stop="drawer = !drawer" dark icon><v-icon>list</v-icon></v-btn>
      
      <v-spacer />
<span style="text-transform:uppercase;" class="white--text mr-2">{{username}}</span>
<v-menu bottom left>
        
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-img max-width="40px" max-height="40px" src="user2.png" />
          </v-btn>
        </template>

       <v-list>
          <v-list-item class="menuUser pointer">
            <v-list-item-title  @click="toggleDialogPassword(true)">
              <v-icon left color="error" align="center" >lock</v-icon>
              Cambiar Contraseña
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menuUser poiter" @click="SET_DESLOGIN()">
            <NuxtLink to="/login">
            <v-list-item-title>
              <v-icon left color="error" >west</v-icon>
              Salir
            </v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
        <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
import { mapState, mapMutations } from "vuex";
import password from "@/components/cambiarPassword";

export default {
  components:{
    password
  },
  data() {
    return {
      username: Cookies.get('username'),
      maquinas: [
        ['T. de Maquina', 'mdi-cog-outline']
      ],
      lineas: [
        ['T. de Linea', 'mdi-cog-outline']
      ],
      usuarios: [
        ['Opcion 1', 'mdi-cog-outline'],
        ['Opcion 2', 'mdi-cog-outline']
      ],
      ot: [
        ['Opcion 1', 'mdi-cog-outline'],
        ['Opcion 2', 'mdi-cog-outline']
      ],
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    ...mapMutations(["SET_DESLOGIN"]),
  },
}
</script>

<style scoped>
a {  
  text-decoration: none;
  color:rgb(0, 0, 0, 0.87);
  }
.menuUser:hover{
 background: rgb(189, 189, 189);
  
}
.pointer {cursor: pointer;}
</style>
