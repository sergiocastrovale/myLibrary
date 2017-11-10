exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.timestamps(false, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
