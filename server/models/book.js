import bookshelf from 'bookshelf'
import Tag from './category'
import Author from './author'

const Book = bookshelf.Model.extend({
  tableName: 'books',
  tags: () => {
    return this.belongsToMany(Tag)
  },
  authors: () => {
    return this.belongsToMany(Author)
  }
})

module.exports = Book
