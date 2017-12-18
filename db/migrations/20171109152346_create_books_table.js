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
    table.integer('pageCount')
    table.boolean('fetched').defaultTo(true)
    table.timestamps(false, true)
  }).createTable('user_book', function (table) {
    table.increments('id').primary()
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('cascade')
    table.integer('bookId').unsigned().references('id').inTable('books').onDelete('cascade')
    table.text('notes')
    table.string('file')
    table.boolean('isFavorite').defaultTo(false)
  }).createTable('tag_book', function (table) {
    table.increments('id').primary()
    table.integer('tagId').unsigned().references('id').inTable('tags').onDelete('cascade')
    table.integer('bookId').unsigned().references('id').inTable('books').onDelete('cascade')
  }).createTable('author_book', (table) => {
    table.increments('id').primary()
    table.integer('authorId').unsigned().references('id').inTable('authors').onDelete('cascade')
    table.integer('bookId').unsigned().references('id').inTable('books').onDelete('cascade')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('user_book').dropTableIfExists('tag_book').dropTableIfExists('author_book').dropTableIfExists('books')
}
