'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Line extends Model {
    static get table () {
        return 'line';
      }
      static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    machine(){
        return this.hasMany('App/Models/Machine', 'id', "line_id") 
    }

}

module.exports = Line
