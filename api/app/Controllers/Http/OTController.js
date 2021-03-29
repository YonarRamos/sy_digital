'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Machine = use("App/Models/Machine");

const Observation = use("App/Models/Observation");
const Line = use("App/Models/Line");
const OT = use("App/Models/OT");
var moment = require('moment');
const Database = use("Database");
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
      let { solicitante, ejecutor, ingreso, sector_id, line_id, machine_id, grupo, status_id, company_id, observations } = request.all();
      console.log(observations)
      const rules = {
        solicitante: 'required',
        ejecutor: 'required',
        ingreso: 'required',
        sector_id: 'required',
        line_id: 'required',
        machine_id: 'required',
        grupo: 'required',
        status_id: 'required',
        company_id: 'required'
      }

      let validation = await validate({ solicitante, ejecutor, ingreso, sector_id, line_id, machine_id, grupo, status_id, company_id }, rules);
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
        company_id
      })
      var arrPromisesObsertions = observations.map(e => {
        return {
          sections: e.sections,
          title: e.title,
          real: e.real,
          estado: e.estado,
          observations: e.observations,
          img: e.img,
          id_ot: ot.id
        }
      })
      const resp = await Promise.all(arrPromisesObsertions)
      await Observation.query().insert(resp);
      return response.status(200).json({ message: "OT creado con exito!", data: ot })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ menssage: 'Hubo un error al realizar la operación', error })

    }
  }

  /**
   * Display a single ot.
   * GET ots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
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
