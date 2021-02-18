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
}

module.exports = Line
