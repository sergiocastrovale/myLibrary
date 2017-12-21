exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('token')
    table.boolean('isAdmin').defaultTo(false)
    table.timestamps(false, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
