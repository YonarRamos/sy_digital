
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
  ots:[]
});

export const mutations = {
  async SET_AUTH(state, token) {
  Cookies.set('token', token);
  state.auth = true;
  this.$router.push('/');
  },
  async SET_USER(state, payload){
    state.user = payload
    Cookies.set('username', payload.username);
    Cookies.set('company', payload.company_id);
    Cookies.set('rol', payload.rol_id);
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
    location.reload();
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
           }).catch(err => {               
           })                
     }
   },
 

};