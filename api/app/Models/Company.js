'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Company extends Model {
  static get table () {
    return 'company';
  }
  static get createdAtColumn() {
    return null;
}
static get updatedAtColumn() {
    return null;
}

Line(){
  return this.hasMany('App/Models/Line' , 'id' , 'company_id')
}
usuario(){
  return this.hasMany('App/Models/User' , 'id' , 'company_id')
}

}

module.exports = Company
