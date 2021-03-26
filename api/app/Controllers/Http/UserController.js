'use strict'

const User = use("App/Models/User");
const Rol = use("App/Models/Rol");
const Company = use("App/Models/Company");
const Query = require("../../Utils/Query");
const Hash = use('Hash');
const Response = use('App/Models/Response');
const { validate } = use('Validator');

class UserController {
 
  async index ({ request, response, params, auth }) {
    try {
      var company_id = params.id
      const user = await auth.getUser();
      var query = User.query();
      var{
        page , 
        perPage,
      }= request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      
      let users = await User.query().where('company_id' , company_id).paginate(page , perPage)
        users = users.toJSON();
       // console.log(users)
        var arrayUser = users.data.map(e=>{
          return{
            "id": e.id,
            "name": e.username,
            "email": e.email,
            "rol": e.rol_id
          }
        })
        let resp = await Promise.all(arrayUser)
        users.data = resp
       response.status(200).json({message: 'Listado de Usuario', data : users})
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({  menssage: 'Hubo un error al realizar la operación', error  })
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  
  async store ({ request, response }) {
    try {
      let{ username , email , password , rol_id,confirm_password , company_id} = request.all();
      const rules = {
        username: 'required',
        email: 'required',
        password: 'required',
        rol_id: 'required', 
        confirm_password: 'required',
        company_id: 'required'
      }
      let validation = await validate({ username , email , password , rol_id, confirm_password, company_id}, rules);
      if(validation.fails()){
       return response.status(404).json({message: "Datos Insufiente"});
      }
      if(password != confirm_password){
        return response.status(404).json({message: 'Las contraseña no coinciden'})
      }else{
        const user = await User.create({
          username,
          email,
          password : confirm_password,
          company_id,
          rol_id,
        })
        return response.status(200).json({message: "Usuario creado con exito!", data: user})
      }
      
    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al intentar realizar la operación', error })
    }
  }

  //funcion para logearse
  async login ({request ,response , auth}){
    try {
      const { email , password} = request.all();
      let validationUser = await User.findBy('email' , email);
      validationUser = validationUser.toJSON();
      if(validationUser != null){
        delete validationUser.password
      }
      const token = await auth.attempt(email , password , { expiresIn:'1m'});
      const auth1 = await auth.withRefreshToken().attempt(email , password)
      console.log(auth1)
      const resCustom = new Response(true, 'Logueado con exito', token.token)
      resCustom.data = validationUser
      response.status(200).json(resCustom);
    } catch (error) {
      console.log(error)
      var resCustom = ''
      if (error.message.includes('Cannot verify user password')) {
        resCustom = new Response(false, 'Contraseña incorrecta');
      } else if (error.message.includes('Cannot find user')) {
        resCustom = new Response(false, 'Usuario no encontrado');
      } else {
        resCustom = new Response(false, 'Hubo un error al procesar la solicitud');
      }
      return response.status(401).json(resCustom);
    }
  }
  async loginToken({ auth, response }) {
    try {
      const user = await auth.getUser();
     
      if (user) {
        let data = { email: user.email, password: user.password }
        data = user
        return response.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({ menssage: 'Hubo un error al realizar la operación' })
    }

  }
  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    try {
      const user = await auth.getUser()
      var id = params.id
      let users = await User.query().with('company').with('rols').where('id', id).fetch();
      users = users.toJSON();
      var arrPromisesUsers = users.map(item =>{
        return{
          "id": item.id,
          "username": item.username,
          "email": item.email,
          "company_id": item.company.id, 
          "company_name": item.company.name,
          "rol": item.rols.rol,
        }
      })
      const resp = await Promise.all(arrPromisesUsers);
      return response.status(200).json({ menssage: 'Usuario', data: resp });
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({
        menssage: 'Grupo no encontrado',
        id
      })
    }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
