'use strict'

const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Company = use("App/Models/Company");
var moment = require('moment');
class CompanyController {
  
  async index ({ request, response, view }) {
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
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , auth }) {
    try {
      const user =  await auth.getUser(); 
      let{ name , description}= request.all()
      const rules = {
        name: 'required',
      }
      
      let validation = await validate({ name }, rules);
      if(validation.fails()){
       return response.status(404).json({message: "Datos Insufiente"});
      }
      if(user.id == 1){
        const company = await Company.create({
          name, 
          description
        })
        return response.status(200).json({message: 'Empresa Cargada con exito!' , data: company})
      }
    } catch (error) {
      
    }
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing company.
   * GET companies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CompanyController
