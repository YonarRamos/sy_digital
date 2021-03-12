'use strict'

const User = use("App/Models/User");
const StatusMachine = use("App/Models/StatusMachine");
const Company = use("App/Models/Company");
const Query = require("../../Utils/Query");
class StatusMachineController {
 
  async index ({ request, response, auth}) {
    try {
      const user = await auth.getUser();
      var query = StatusMachine.query();
      var{
        page , 
        perPage,
      }= request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      
      let status = await StatusMachine.query().paginate(page , perPage)
      status = status.toJSON();
      /*  console.log(users)
      var arrPromises =  users.data.map(item=>{
        return{
          "id": item.id,
        "username": item.username,
        "email": item.email,
        "company_id": item.company.id, 
        "company_name": item.company.name,
        "rol": item.rols.rol,
        }
      })
      let resp = await Promise.all(arrPromises)
      //console.log(users.data)
      users.data = resp*/
       response.status(200).json({message: 'Listado de Estados de Maquinas', data : status})
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({  menssage: 'Hubo un error al realizar la operación', error  })
    }
  
  }

  /**
   * Render a form to be used for creating a new statusmachine.
   * GET statusmachines/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new statusmachine.
   * POST statusmachines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single statusmachine.
   * GET statusmachines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing statusmachine.
   * GET statusmachines/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update statusmachine details.
   * PUT or PATCH statusmachines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a statusmachine with id.
   * DELETE statusmachines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = StatusMachineController
