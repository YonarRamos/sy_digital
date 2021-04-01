'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Machine = use("App/Models/Machine");
const Calendar = use("App/Models/Calendar");
const Observation = use("App/Models/Observation");
const Line = use("App/Models/Line");
const OT = use("App/Models/OT");
var moment = require('moment');
const Database = use("Database");
const Helpers = use('Helpers');
class OTController {
  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      var query = OT.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let ot = await query
        .with('sector')
        .with('machine')
        .with('line')
        .with('status')
        .with('company')
        .with('task')
        .with('observation')
        .paginate(page, perPage);
      ot = ot.toJSON();
      var arrPromisesOT = ot.data.map(e => {
        return {
          'OT': {
            "id": e.id,
            "solicitante": e.solicitante,
            "ejecutor": e.ejecutor,
            "ingreso": e.ingreso,
            "sector": e.sector.name,
            "line": e.line.name,
            "machine": e.machine.name,
            "task": e.task.type_task,
            "grupo": e.grupo,
            "status": e.status.type,
            "company": e.company.name,
          }, 'Observations': e.observation.map(i => {
            return {
              "sections": i.sections,
              "title": i.title,
              "real": i.real,
              "estado": i.estado,
              "observations": i.observations,
              "img": i.img
            }
          })

        }
      })
      let resp = await Promise.all(arrPromisesOT)
      ot.data = resp
      response.status(200).json({ message: 'Listado de OT', data: ot })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(200).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(500).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Render a form to be used for creating a new ot.
   * GET ots/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new ot.
   * POST ots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      let { solicitante, ejecutor, ingreso, sector_id, line_id, machine_id, grupo, status_id, type_task_id, company_id, observation , fechas} = request.all();
     //console.log( observation , fechas)
     /*const img = request.file('img', {
        types: ['image'],
        size: '2mb'
      })*/
      const rules = {
        solicitante: 'required',
        ejecutor: 'required',
        ingreso: 'required',
        sector_id: 'required',
        line_id: 'required',
        machine_id: 'required',
        grupo: 'required',
        status_id: 'required',
        company_id: 'required',
        type_task_id : 'required'
      }

      let validation = await validate({ solicitante, ejecutor, ingreso, sector_id, line_id, machine_id, grupo, status_id, company_id , type_task_id}, rules);
      if (validation.fails()) {
        return response.status(200).json({ message: "Datos Insufiente" });
      }
    
      const ot = await OT.create({
        solicitante,
        ejecutor,
        ingreso,
        sector_id,
        line_id,
        machine_id,
        grupo,
        status_id,
        company_id,
        type_task_id
      })
     /* await img.move(Helpers.appRoot(`uploads/${ot.id}`), {
        name: `${ot.id}.jpg`,
        overwrite: true
      })
      if (!img.moved()) {
        throw "No se pudo guardar la img."
      }*/
      //console.log(observation)
      var arrPromisesObsertions = observation.map(e => {
        //console.log(e)
        return {
          sections: e.sections,
          title: e.title,
          real: e.real,
          estado: e.estado,
          observations: e.observations,
          img: ot.id+'.jpg',
          id_ot: ot.id
        }
      })
      const resp = await Promise.all(arrPromisesObsertions)
      await Observation.query().insert(resp);
     // console.log(fechas)
      var arrPromisesFechas = fechas.map(i =>{
       // console.log(i.fecha)
        return {
          id_ot : ot.id,
          create_date : i.fecha,

        }
      })
      const resp1 = await Promise.all(arrPromisesFechas)
      await Calendar.query().insert(resp1)
      return response.status(200).json({ message: "OT creado con exito!", data: ot })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ menssage: 'Hubo un error al realizar la operación', error })

    }
  }


  async show({ params :{id}, request, response, auth }) {
    try {
      const user = await auth.getUser();
      let ot = await OT.query().where('id', id).with('sector')
      .with('machine')
      .with('line')
      .with('status')
      .with('company')
      .with('task')
      .with('observation').fetch();
      ot = ot.toJSON();
      var arrPromisesOT = ot.map(e => {
        return {
          'OT': {
            "id": e.id,
            "solicitante": e.solicitante,
            "ejecutor": e.ejecutor,
            "ingreso": e.ingreso,
            "sector": e.sector.name,
            "line": e.line.name,
            "task": e.task.type_task,
            "machine": e.machine.name,
            "grupo": e.grupo,
            "status": e.status.type,
            "company": e.company.name,
          }, 'Observations': e.observation.map(i => {
            return {
              "sections": i.sections,
              "title": i.title,
              "real": i.real,
              "estado": i.estado,
              "observations": i.observations,
              "img": i.img
            }
          })

        }
      })
      let resp = await Promise.all(arrPromisesOT)
      ot = resp
      return response.status(200).json({ menssage: 'OT', data: ot });
    }catch(error){
      console.log(error)
      if(error.name == 'InvalidJwtToken'){
        return response.status(200).json({menssage: 'Usuario no Valido'})
       }
      return response.status(500).json({
        menssage: 'OT no encontrado',
        id
      })
    }
  }

  /**
   * Render a form to update an existing ot.
   * GET ots/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update ot details.
   * PUT or PATCH ots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a ot with id.
   * DELETE ots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = OTController
