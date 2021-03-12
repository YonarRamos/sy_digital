// @ts-nocheck
'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Machine = use("App/Models/Machine");
const Line = use("App/Models/Line");
var moment = require('moment');
const Database = use("Database");
class MachineController {

  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      var query = Machine.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let machine = await Machine.query().with('company').with('section').with('statusMachine').with('users').paginate(page, perPage);
      machine = machine.toJSON();
      
      var arrPromiseMachine = machine.data.map(item => {
        return {
          "name": item.name,
          "section_id": item.section.name,
          "description": item.description,
          "status_machine_id": item.statusMachine.status,
          "last_update": item.last_update,
          "user_id": item.users.username,
          "company_id": item.company.name,
        }
      })
      let resp = await Promise.all(arrPromiseMachine)
      machine.data = resp
      response.status(200).json({ message: 'Listado de Maquina', data: machine })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
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
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new machine.
   * POST machines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      let { name, sector_id, description , line_id} = request.all();
      const rules = {
        name: 'required',
        sector_id: 'required',
        line_id : 'required'
      }

      let validation = await validate({ name, sector_id , line_id }, rules);
      if (validation.fails()) {
        return response.status(404).json({ message: "Datos Insufiente" });
      }
     
      if (user.rol_id == 1) {
        const machine = await Machine.create({
          name,
          sector_id,
          description,
          line_id,
          status_machine_id: 1,
          last_update: moment().format('YYYY-MM-DD HH:mm:ss')
        })
       // const TableMachineCompany = await Database.from('company_line').insert([{company_id: company_id , line_id: line_id}]) 

        return response.status(200).json({ message: "Maquina creado con exito!", data: machine})
        
      } else {
        return response.status(400).json({ menssage: "Usuario sin permiso suficiente para realizar esta operacion!" })
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
  async show({ params, request, response, view }) {
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
  async edit({ params, request, response, view }) {
  }

  /**
   * Update machine details.
   * PUT or PATCH machines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a machine with id.
   * DELETE machines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = MachineController
