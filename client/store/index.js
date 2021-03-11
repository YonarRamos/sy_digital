
import Cookies from "js-cookie";
import cookie from 'cookie';
import axios from "../plugins/axios";

export const state = () => ({
  auth: false,
  user:{
    username:'',
    company:'',
    rol:null
  },
  infoModal:{
    dialog: false,
    msj:"",
    titulo:"",
    alertType: "",
  },
  dialogPassword: false,
  ots:[],
  clienteID:1,
  clienteName:'Seleccione una empresa',
  indexTab:'tab-1'
});

export const mutations = {
  async SET_AUTH(state, token) {
  Cookies.set('token', token);
  state.auth = true;
  this.$router.push('/');
  },
  async SET_USER(state, payload){
    state.user = payload
  },
  async SET_AUTH_AUTOMATIC(state, res) {
    state.auth = true;
    this.$router.push('/')
  },
  async SET_DESLOGIN(state) {  
    state.auth = false;
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('company_id')
    Cookies.remove('rol_id')   
    this.$router.push('/login')
  },
  toggleDialogPassword(state, payload){
    state.dialogPassword = payload
  },
  toggleInfoModal(state, payload){
    state.infoModal.dialog = true
    state.infoModal.msj = payload.msj
    state.infoModal.titulo = payload.titulo
    state.infoModal.alertType = payload.alertType
  },
  ocultarInfoModal(state, payload){
    state.infoModal.dialog = payload
  },
  cargarOTS(state, payload){
    state.ots.push(payload)
  },
  cargarClienteID(state, payload){
    state.clienteID = payload.id;
    state.clienteName = payload.name;
  },
  asignarIndexTab(state, payload){
    state.indexTab = `tab-${payload}`
  }

};
export const actions = {
  
  async nuxtServerInit ({ commit , state }, { req }  ) { 
        
     if (req.headers.cookie) { 
         let { token } = cookie.parse(req.headers.cookie);
        
         await axios
           .get("/loginUsersAutomatico", {
             headers: { Authorization: `Bearer ${token}` }
           })
           .then(res => {
             this.commit('SET_AUTH_AUTOMATIC', true );
             console.log('Automatic:', res);
           }).catch(err => {               
           })                
     }
   },
 

};