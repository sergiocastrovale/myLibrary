exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('subtitle')
    table.string('publisher')
    table.string('publishedDate')
    table.string('googleId')
    table.string('intro')
    table.text('description')
    table.text('notes')
    table.integer('pageCount')
    table.string('file')
    table.timestamps(false, true)
  }).createTable('tags_books', function (table) {
    table.integer('tag_id').unsigned().notNullable().references('tags.id').onDelete('cascade')
    table.integer('book_id').unsigned().notNullable().references('books.id').onDelete('cascade')
  }).createTable('authors_books', (table) => {
    table.integer('author_id').unsigned().notNullable().references('authors.id').onDelete('cascade')
    table.integer('book_id').unsigned().notNullable().references('books.id').onDelete('cascade')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('books')
    .dropTableIfExists('tags_books')
    .dropTableIfExists('authors_books')
}
