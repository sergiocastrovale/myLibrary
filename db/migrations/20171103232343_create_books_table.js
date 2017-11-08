
exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', function (table) {
    table.increments()
    table.string('title')
    table.string('subtitle')
    table.string('publisher')
    table.string('publishedDate')
    table.string('googleId')
    table.string('intro')
    table.text('description')
    table.integer('pageCount')
    table.timestamps(false, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('books')
}
