exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username')
    table.string('email')
    table.string('password')
    table.string('token')
    table.boolean('isAdmin').defaultTo(false)
    table.timestamps(false, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
