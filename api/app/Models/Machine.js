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
    static get dates() {
      return super.dates.concat(['last_update'])
    }
    
    static castDates(field, value) {
      if (field === 'last_update') {
        return value.format('YYYY-MM-DD HH:mm:ss')
      }
    }
   
    sector () {
        return this.belongsTo('App/Models/Section', 'sector_id')
      }
      line () {
        return this.belongsTo('App/Models/Line', 'line_id')
      }
      statusMachine () {
        return this.belongsTo('App/Models/StatusMachine', 'status_machine_id')
      }
      users () {
        return this.belongsTo('App/Models/User', 'user_id')
      }
}

module.exports = Machine
