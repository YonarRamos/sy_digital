'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StatusOt extends Model {
    static get table () {
        return 'status_o_t';
      }
}

module.exports = StatusOt
