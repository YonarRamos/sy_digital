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
}

module.exports = Company
