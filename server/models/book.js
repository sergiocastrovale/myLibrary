import Bookshelf from '../../db/database'
import Tag from './tag'
import Author from './author'

class Book extends Bookshelf.Model {
  get tableName () {
    return 'books'
  }

  get hasTimestamps () {
    return true
  }

  tags () {
    return this.belongsToMany('Tag')
  }

  authors () {
    return this.belongsToMany('Author')
  }

  getAll () {
    return this.fetchAll()
  }
}

export default Bookshelf.model('Book', Book)
