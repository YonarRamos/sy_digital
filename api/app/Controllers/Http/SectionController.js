'use strict'

'use strict'
const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Section = use("App/Models/Section");
const Company = use("App/Models/Company");
const Database = use('Database')
class SectionController {
  
  async show ({ request, response, auth , params }) {
    try {
      var company_id = params.id
      const user = await auth.getUser();
      let sector = await Section.query().where('company_id', company_id).fetch();
      sector = sector.toJSON();
      //console.log(sector)
     var arrSector = sector.map(e=>{
        return{
          "id": e.id,
          "name": e.name,
          "company_id": e.company_id
        }
      })
      let resp = await Promise.all(arrSector)
      sector = resp
      response.status(200).json({ message: 'Listado de Sectores', data: sector })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Render a form to be used for creating a new section.
   * GET sections/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new section.
   * POST sections
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  

  /**
   * Render a form to update an existing section.
   * GET sections/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update section details.
   * PUT or PATCH sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a section with id.
   * DELETE sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SectionController
