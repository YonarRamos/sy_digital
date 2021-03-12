'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
    static get table () {
        return 'sector';
      }
}

module.exports = Section
