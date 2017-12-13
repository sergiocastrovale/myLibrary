exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('subtitle')
    table.string('isbn10')
    table.string('isbn13')
    table.string('language')
    table.string('url')
    table.string('publisher')
    table.string('publishedDate')
    table.string('googleId')
    table.string('intro')
    table.text('description')
    table.text('notes')
    table.integer('pageCount')
    table.string('file')
    table.boolean('isFavorite').defaultTo(false)
    table.timestamps(false, true)
  }).createTable('tag_book', function (table) {
    table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('cascade')
    table.integer('book_id').unsigned().references('id').inTable('books').onDelete('cascade')
  }).createTable('author_book', (table) => {
    table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('cascade')
    table.integer('book_id').unsigned().references('id').inTable('books').onDelete('cascade')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('tags_books').dropTableIfExists('authors_books').dropTableIfExists('books')
}
