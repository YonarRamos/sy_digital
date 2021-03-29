'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OT extends Model {
    static get table () {
        return 'ot';
      }
      static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    sector () {
        return this.belongsTo('App/Models/Section', 'sector_id')
      }
      machine () {
        return this.belongsTo('App/Models/Machine', 'machine_id')
      }
      company () {
        return this.belongsTo('App/Models/Company', 'company_id')
    }
    line () {
        return this.belongsTo('App/Models/Line', 'line_id')
    }
    status () {
        return this.belongsTo('App/Models/StatusOt', 'status_id')
    }
    observation () {
        return this.hasMany('App/Models/Observation', 'id' , 'id_ot')
    }
}

module.exports = OT
