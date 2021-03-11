'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    Users() {
        return this.hasMany('App/Models/User', 'user_id')
      }

      static get table () {
        return 'rols';
      }
      static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    
}

module.exports = Rol
