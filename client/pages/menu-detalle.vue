<template>
  <div class="fondo">
    <v-container>
      <v-row>
        <v-col sm="4" lg="3" class="d-flex justify-center">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover, color: '#295382' }"
              height="155"
              width="155"
              style="cursor: pointer"
              class="d-flex align-center"
              color="#FF5733"
            >
              <v-card-text class="d-flex justify-center">
                <v-icon color="white" size="70"> warning </v-icon>
              </v-card-text>
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
  layout:"layoutitem",
   data() {
    return{
    }
  },
  methods: {
  },
  mounted() {
    this.showBar = false
  }
}
</script>


<style lang="css" scoped>
a{
  text-decoration: none;
  cursor: pointer;
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