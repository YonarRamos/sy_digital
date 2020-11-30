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

             <!--  <v-card-title class="pt-0 d-flex justify-center"
                >Avisos</v-card-title 
              >-->
            </v-card>
          </v-hover>
        </v-col>

        <v-col  sm="4" lg="3" class="d-flex justify-center">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              height="155"
              width="155"
              style="cursor: pointer"
              class="d-flex align-center"
              color="#82E0AA"
            >
              <v-card-text class="d-flex justify-center">
                <v-icon color="white" size="70"> build </v-icon>
              </v-card-text>

       <!--        <v-card-title
                class="pt-0 d-flex justify-center font-weight-medium Subtitle 1"
                >O. de Trabajo</v-card-title
              > -->
            </v-card>
          </v-hover>
        </v-col>

        <v-col  sm="4" lg="3" class="d-flex justify-center">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover, color: '#295382' }"
              height="155"
              width="155"
              style="cursor: pointer"
              class="d-flex align-center"
              color="#FFC300"
            >
              <v-card-text class="d-flex justify-center pb-0">
                <v-icon color="white" size="80"> search </v-icon>
              </v-card-text>

       <!--        <v-card-title class="pt-0 d-flex justify-center"
                >Consulta</v-card-title
              > -->
            </v-card>
          </v-hover>
        </v-col>
        <v-col  sm="4" lg="3" class="d-flex justify-center">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover, color: '#295382' }"
              height="155"
              width="155"
              style="cursor: pointer"
              class="d-flex align-center"
              color="#1F618D"
            >
              <v-card-text class="d-flex justify-center pb-0">
                <v-icon color="white" size="80"> widgets </v-icon>
              </v-card-text>

        <!--       <v-card-title class="pt-0 d-flex justify-center"
                >Acciones</v-card-title
              > -->
            </v-card>
          </v-hover>
        </v-col>
        <v-col  sm="4" lg="3" class="d-flex justify-center">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover, color: '#295382' }"
              height="155"
              width="155"
              style="cursor: pointer"
              class="d-flex align-center"
              color="#A9CCE3"
            >
              <v-card-text class="d-flex justify-center pb-0">
                <v-icon color="white" size="80"> grading </v-icon>
              </v-card-text>

        <!--       <v-card-title class="pt-0 d-flex justify-center"
                >Analisis
              </v-card-title> -->
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {}
</script>

<style lang="css" scoped>
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