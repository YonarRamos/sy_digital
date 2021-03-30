'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalendarSchema extends Schema {
  up () {
    this.create('calendars', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('calendars')
  }
}

module.exports = CalendarSchema
