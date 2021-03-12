'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Company = use("App/Models/Company");
var moment = require('moment');
const Database = use('Database')
class CompanyController {

  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      var query = Company.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let company = await Company.query().with('Line')
      .with('usuario')
      .with('usuario.rols')
      .with('Line.machine')
      .with('Line.machine.sector')
      .with('Line.machine.statusMachine').paginate(page, perPage);
      company = company.toJSON();
      var arrPromisesCompany = company.data.map(it => {
        return {
          'company': {
            "id": it.id,
            "name": it.name,
            "description": it.description,
          }, 'Linea': it.Line.map(p => {
           //console.log(p)
            return {
              "line_id": p.id,
              "name_linea": p.name,
              "description_linea": p.description,
              "machine":p.machine
            } 
          }),
          'user': it.usuario.map(e=>{
            return{
              "username": e.username,
              "email": e.email,
              "rol": e.rols.name
            }
          })
        }
        })
      let resp = await Promise.all(arrPromisesCompany)
      company.data = resp
      response.status(200).json({ message: 'Listado de Company', data: company })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Render a form to be used for creating a new company.
   * GET companies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      let { name, description } = request.all()
      const rules = {
        name: 'required',
      }

      let validation = await validate({ name }, rules);
      if (validation.fails()) {
        return response.status(404).json({ message: "Datos Insufiente" });
      }
      if (user.id == 1) {
        const company = await Company.create({
          name,
          description
        })
        return response.status(200).json({ message: 'Empresa Cargada con exito!', data: company })
      }
    } catch (error) {

    }
  }

  async show({ params, request, response, auth }) {
   try {
      var id = params.id
      const user = await auth.getUser();
      var query = Company.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let company = await Company.query().with('Line').with('usuario').with('usuario.rols').with('Line.machine').where('id', id).paginate(page, perPage);
      company = company.toJSON();
      var arrPromisesCompany = company.data.map(it => {
        return {
          'company': {
            "id": it.id,
            "name": it.name,
            "description": it.description,
          }, 'Linea': it.Line.map(p => {
           //console.log(p)
            return {
              "line_id": p.id,
              "name_linea": p.name,
              "description_linea": p.description,
              "machine": p.machine
            }
          }),
          'user': it.usuario.map(e=>{
            return{
              "username": e.username,
              "email": e.email,
              "rol": e.rols.name
            }
          })
        }
        })
      let resp = await Promise.all(arrPromisesCompany)
      company.data = resp
      response.status(200).json({ message: 'Listado de Company', data: company })
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({
        menssage: 'Company no encontrado',
        id
      })
    }
  }

  async CompanyName({ params, request, response, }) {
    try {
      var query = Company.query();
      let company = await Company.query().fetch();
      company = company.toJSON();
      console.log(company)
      let ArraPromises = company.map(it => {
        return {
          "id": it.id,
          "name": it.name,
          "description": it.description
        }
      })
      const resp = await Promise.all(ArraPromises);
      return response.status(200).json({ menssage: 'Company', data: resp })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CompanyController
