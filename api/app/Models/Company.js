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
machine () {
  return this.belongsToMany('App/Models/Machine', 'company_id' , 'machine_id').pivotTable('company_machine')
}
}

module.exports = Company
