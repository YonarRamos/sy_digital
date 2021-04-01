'use strict'

const Calendar = use("App/Models/Calendar");
const OT = use("App/Models/OT");
var moment = require('moment');
const Database = use("Database");
class CalendarController {

  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      var query = Calendar.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let calendar = await query
        .with('ot')
        .with('ot.sector')
        .with('ot.machine')
        .with('ot.line')
        .with('ot.status')
        .with('ot.company')
        .with('ot.observation')
        .with('ot.calendar').paginate(page, perPage);
      calendar = calendar.toJSON();
      var arrPromisesCalendar = calendar.data.map(item => {
        return {
            "id": item.ot.id,
            "solicitante": item.ot.solicitante,
            "ejecutor": item.ot.ejecutor,
            "ingreso": item.ot.ingreso,
            "line": item.ot.line.name,
            "sector": item.ot.sector.name,
            "machine": item.ot.machine.name,
            "grupo": item.ot.grupo,
            "status": item.ot.status.type,
            "company": item.ot.company.name,
           "observations": item.ot.observation.map(e => {
            return {
              "sections": e.sections,
              "title": e.title,
              "real": e.real,
              "estado": e.estado,
              "observations": e.observations,
              "img": e.img
            }
          }),
          "fechas": item.ot.calendar.map(i =>{
            return{
              "fecha": i.create_date
            }
          })
        
       }
        })
        let resp = await Promise.all(arrPromisesCalendar)
        calendar.data = resp
      response.status(200).json({ message: 'Listado de Fechas OT', data: calendar })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(200).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(500).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Render a form to be used for creating a new calendar.
   * GET calendars/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new calendar.
   * POST calendars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single calendar.
   * GET calendars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing calendar.
   * GET calendars/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update calendar details.
   * PUT or PATCH calendars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a calendar with id.
   * DELETE calendars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CalendarController
