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
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


<v-app-bar :clipped-left="clipped" fixed app color="#295382">
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />


      <v-spacer />

<v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-img max-width="40px" max-height="40px" src="user2.png" />
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="menuUser pointer">
            <v-list-item-title  >
              <v-icon left color="#295382" align="center" >lock</v-icon>
              Cambiar Contraseña
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menuUser poiter">
            <v-list-item-title>
              <v-icon left color="#295382" >west</v-icon>
              Salir
            </v-list-item-title>
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
export default {
  data() {
    return {
      clipped: false,
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
}
</script>
