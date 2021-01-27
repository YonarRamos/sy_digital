<template>
  <v-row justify="end">
        <v-col cols="auto">
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
                v-model = "dialog"
            >
                <template v-slot:activator="{ on, attrs }">
                <a 
                v-bind="attrs"
                v-on="on"
                >
                ¿Aún no tienes cuenta? Registrate Aquí
                </a>
                
                </template>
                <template>
                <v-card>
                    <v-toolbar
                    color="error"
                    dark
                    >
                        <strong>Nuevo Usuario</strong>
                        <v-spacer></v-spacer>
                        <img src="SYDIGITAL_white2.png" alt="logo" style="width:200px;">
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field 
                            outlined
                            placeholder="Ingresar Email"
                            color="error"
                            class="mt-5"
                            :rules="[rules.required, rules.email]"
                            ></v-text-field>
                        <v-select
                            :items="empresas"
                            label="Empresa"
                            outlined
                            class="mt-5"
                            color="error"
                            :rules="[rules.required]"
                            ></v-select>

                        <v-text-field
                            type="password" 
                            outlined
                            placeholder="Password"
                            color="error"
                            class="mt-5"
                            :rules="[rules.required]"
                            ></v-text-field>
                        <v-text-field
                            type="password" 
                            outlined
                            placeholder="Confirmar Password"
                            color="error"
                            class="mt-5"
                            :rules="[rules.required]"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                        
                        text
                        @click="submid"
                        color='success'
                        :loading="loading"
                        :disabled="loading"
                        >    <span v-if="text">REGISTRAR</span>
                              <v-icon large v-if="icon" dark>
                                check_circle
                            </v-icon>
                        </v-btn>

                        <v-btn
                        text
                        @click="hide"
                        color='error'
                        >Close</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row >
</template>
 
<script>
export default {
    data(){
        return{
            text:true,
            loader: null,
            icon:false,
            loading:false,
            dialog:false,
            empresas:['Systelec', 'Softys','Jhonson','Ejempl0 1'],
            valid:true,
            rules: {
                    required: v => !!v || "Este campo es obligatorio",
                    email: v => /.+@.+/.test(v) || 'Por favor introduzca un email valido',
                    },
        }
    },
    methods:{
        submid(){
            console.log(this.$refs.form.validate());
            this.text = false;
            this.loading = true;
            this.loader = 'loading'
            

            setTimeout(() => {
            this.loader = null  
            this.loading = false;
            this.icon = true;     
            }, 3000)


            setTimeout(()=>{
            this.icon = false;
            this.text = true;
            },6000)
        

        },
        hide(){
            this.dialog = false;
            this.$refs.form.reset();
        }
    }
}
</script>

<style scoped>
    a {
    text-decoration: none;
    color: #383838;
    font-size: 14px;
    }
    a:hover{
    color:#FF5252
    }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>