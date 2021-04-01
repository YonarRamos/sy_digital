<template>
  <v-container>
      <v-row align="center">
          <v-col align-self="center">
            <v-icon @click="overlay = true">visibility</v-icon>
            <v-overlay :value="overlay" @click="overlay = false">
                <v-icon @click="overlay = false">visibility_off</v-icon>
            <v-carousel class="d-flex justify-center" height="auto">
                <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                >
                <v-container>
                    <v-col align-self="center">          
                        <img class="img" :src="item.src" />
                    </v-col>            
                </v-container>
                </v-carousel-item>
            </v-carousel>
            </v-overlay>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    model: 0,
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),
}
</script>

<style>
    .img{
        display: block;
        width: 100%;
        height: auto;
    }
</style>