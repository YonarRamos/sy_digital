<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#f5f5f5"
    >

<v-list>
      <v-list-item to="/" color="error">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
      <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        :value="false"
        prepend-icon="build"
        color="error"
      >
        <template v-slot:activator>
          <v-list-item-title>Clientes</v-list-item-title>
        </template>

        <v-list-group
          :value="false"
          no-action
          sub-group
          color="error"
          v-for="(item, i) in clientes"
          :key="i"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, url], i) in opciones"
            :key="i"
            link
            :to="url"
            @click="cargarClienteID(item), asignarIndexTab(i+1), drawer=false"
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

<!--         <v-list-group
        </v-list-group> -->
        
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
            v-for="([title, icon, url], i) in ot"
            :key="i"
            link
            :to="url"
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
  <div>
    <img class="img" src="SYDIGITAL_GRAY.png" alt="">
  </div>
</v-navigation-drawer>

<v-app-bar :clipped-left="clipped" fixed app color="#F65B4B">
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
          <v-list-item v-if="rol" class="menuUser pointer">
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
import axios from "@/plugins/axios";
import { mapState, mapMutations } from "vuex";
import password from "@/components/cambiarPassword";

export default {
  components:{
    password
  },
  data() {
    return {
      username: Cookies.get('username'),
      rol: Cookies.get('rol'),
      clientes:[],
      opciones: [
        ['Equipos', 'dns','/opciones'],
        ['Lineas', 'leaderboard','/opciones'],
        ['Máquinas', 'build','/opciones'],
        ['Usuarios', 'people_alt','/opciones']
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    ...mapMutations(["SET_DESLOGIN","toggleDialogPassword","cargarClienteID","asignarIndexTab"]),
    async cargarOpcionesSidebar(){
      try {
        let token = Cookies.get('token');
        await axios.get('company',{
              headers: { Authorization: `Bearer ${token}`}
              })
        .then((res)=>{
          console.log(res.data.data.data)
          this.clientes = res.data.data.data;
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted(){
    this.cargarOpcionesSidebar();
  },
  computed:{
    ...mapState(["indexTab"])
  }
}
</script>

<style scoped>
.img {
  top: 340px;
  left: 25px;
  width: 200px;
  position: relative;
  padding-bottom: 15px;
}
a {  
  text-decoration: none;
  color:rgb(0, 0, 0, 0.87);
  }
.menuUser:hover{
 background: rgb(189, 189, 189);
  
}
.pointer {cursor: pointer;}
</style>
