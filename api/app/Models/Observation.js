'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Observation extends Model {
    static get table () {
        return 'observations';
      }
}

module.exports = Observation
