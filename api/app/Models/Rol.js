'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    Users() {
        return this.hasMany('App/Models/User', 'user_id')
      }
    
}

module.exports = Rol
