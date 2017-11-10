import bookshelf from 'bookshelf'

const User = bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = User
