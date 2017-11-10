exports.up = (knex, Promise) => {
  return knex.schema.createTable('authors', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.text('biography')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('authors')
}
