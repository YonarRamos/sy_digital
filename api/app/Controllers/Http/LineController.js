
'use strict'
const Response = use('App/Models/Response');
const { validate } = use('Validator');
const Line = use("App/Models/Line");
const Company = use("App/Models/Company");
const Database = use('Database')
class LineController {
 
  async index ({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      var query = Line.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      const linea = await Line.query().with('machine').paginate(page, perPage);
      response.status(200).json({ message: 'Listado de Linea', data: linea })
    } catch (error) {
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }  
  }

  
  async store ({ request, response , auth }) {
    try {
      const user = await auth.getUser();
      let { description, name  , company_id} = request.all();
      const rules = {
        name: 'required',
        company_id : 'required'
      }
      
      let validation = await validate({ name,  company_id }, rules);
      if (validation.fails()) {
        return response.status(404).json({ message: "Datos Insufiente" });
      }
      if (user.rol_id == 1) {
        const line = await Line.create({
          name,
          description,
          company_id 
        })
        /*var arrpromises = company.map(item => {
          return {
            name: item.name,
            description: item.description,
            line_id: line.id,
            machine_id : line.machine_id
          }
        })
        const resp = await Promise.all(arrpromises)
        Company.query().insert(resp);*/
        //const TablePivotLIne = await Database.from('company_line').insert([{company_id: company_id , line_id: line.id}]) 

        return response.status(200).json({ message: "Linea creado con exito!", data: line})
        
      } else {
        return response.status(400).json({ menssage: "Usuario sin permiso suficiente para realizar esta operacion!" })
      }

    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al intentar realizar la operación', error })
    }
  }

  
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing line.
   * GET lines/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update line details.
   * PUT or PATCH lines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a line with id.
   * DELETE lines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LineController
