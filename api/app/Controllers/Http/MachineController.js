// @ts-nocheck
'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Machine = use("App/Models/Machine");
var moment = require('moment');
class MachineController {
  
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new machine.
   * GET machines/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new machine.
   * POST machines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , auth }) {
    try {
      const user = await auth.getUser();
      let {name , section_id , description  , company_id} = request.all();
      const rules = {
        name: 'required',
        section_id: 'required',
        description: 'required',
        company_id: 'required'
      }
      
      let validation = await validate({ name , section_id , description, company_id}, rules);
      if(validation.fails()){
       return response.status(404).json({message: "Datos Insufiente"});
      }
      if(user.id == 1){
        const machine = await Machine.create({
          name,
          section_id,
          description,
          status_machine_id : 1,
          last_update: moment().format('YYYY-MM-DD HH:mm:ss '),
          company_id,
          user_id: user.id
        })
        return response.status(200).json({message: "Maquina creado con exito!"})
      }else{
        return response.status(400).json({menssage: "Usuario sin permiso suficiente para realizar esta operacion!"})
      }
    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al intentar realizar la operación', error })
    }
  }

  /**
   * Display a single machine.
   * GET machines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing machine.
   * GET machines/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update machine details.
   * PUT or PATCH machines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a machine with id.
   * DELETE machines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MachineController
