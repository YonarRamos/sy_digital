<template>
  <v-col align-self="center" class="py-0">
    <v-icon color="white" large @click="show">visibility</v-icon>
    <v-overlay v-model="overlay" @click="overlay = false">
        <v-col class="d-flex justify-end pa-0">
          <v-icon large @click="overlay = false" >visibility_off</v-icon>
        </v-col> 
    <v-carousel class="d-flex justify-center"  height="auto" style="padding-bottom:50px;">
        <v-carousel-item
        v-for="(n,i) in previews"
        :key="i"
        >
          <v-container class="pa-0">
              <v-col align-self="center" class="pa-0">          
                  <img class="img" :src="n.path" />
              </v-col>            
          </v-container>
        </v-carousel-item>
    </v-carousel>
    </v-overlay>
  </v-col>
</template>

<script>
export default {
  props:{
    items:{
      type: Array,
      required: true
    }
  },
  data: () => ({
    overlay: false,
    model: 0,
    previews:[]
  }),
  methods:{
      onAddFiles(files) {
      this.previews = [];
      files.forEach((file, index) => {
        const reader = new FileReader()
        reader.addEventListener('load', (e) => {
          this.previews.push({
            name: `archivo ${index}`,
            path: reader.result.toString(),
          })
        })
        reader.addEventListener(
          'error',
          (e) => (this.previews[index] = this.errorImage)
        )
        reader.readAsDataURL(file)
      })
    },
    show(){
      this.overlay = true;
      this.onAddFiles(this.items);
    },
  }
}
</script>

<style scoped>
    .img{
        display: block;
        width: 800px;
        height: auto;
        max-height: 500px;
    }
    @media (max-width: 600px) {
      .img {
        width: 100%;
      }
    }
</style>