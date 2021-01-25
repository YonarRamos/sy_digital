'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    Users() {
        return this.hasMany('App/Models/User')
      }
}

module.exports = Company
