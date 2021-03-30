'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Calendar extends Model {
    static get table () {
        return 'calendar';
      }
      static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    ot () {
        return this.belongsTo('App/Models/OT', 'id_ot')
      }
      static get dates() {
        return super.dates.concat(['create_date'])
    }
      
    static castDates(field, value) {
        if (field === 'create_date') {
          return value.format('DD/MM/YYYY hh:mm:ss')
        }
    }
}

module.exports = Calendar