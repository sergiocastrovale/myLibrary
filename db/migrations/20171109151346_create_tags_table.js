
exports.up = (knex, Promise) => {
  return knex.schema.createTable('tags', function (table) {
    table.increments('id').primary()
    table.string('name')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('tags')
}
