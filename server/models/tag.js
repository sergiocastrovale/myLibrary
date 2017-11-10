import bookshelf from 'bookshelf'

const Tag = bookshelf.Model.extend({
  tableName: 'tags'
})

module.exports = Tag
