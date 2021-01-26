<template>
  <v-row justify="end">
        <v-col cols="auto">
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
            >
                <template v-slot:activator="{ on, attrs }">
                <a 
                v-bind="attrs"
                v-on="on"
                >
                ¿Aún no tienes cuenta? Registrate Aquí
                </a>
                
                </template>
                <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                    color="error"
                    dark
                    >Nuevo Usuario</v-toolbar>
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
                        @click="login"
                        >REGISTRAR</v-btn>
                        <v-btn
                        text
                        @click="dialog.value = false"
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
            this.$refs.form.validate();
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
</style>