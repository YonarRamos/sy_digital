'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Machine extends Model {
    static get table () {
        return 'machine';
      }
      static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    company () {
        return this.belongsTo('App/Models/Company', 'company_id')
      }
}

module.exports = Machine
