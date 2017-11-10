import bookshelf from 'bookshelf'

const Author = bookshelf.Model.extend({
  tableName: 'authors'
})

module.exports = Author
