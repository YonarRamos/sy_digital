'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObservationsSchema extends Schema {
  up () {
    this.create('observations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('observations')
  }
}

module.exports = ObservationsSchema
