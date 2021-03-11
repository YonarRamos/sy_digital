'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompanyLine extends Model {
  static get table () {
    return 'company_line';
  }
  static get createdAtColumn() {
    return null;
}
static get updatedAtColumn() {
    return null;
}

}

module.exports = CompanyLine