import Bookshelf from '../../db/database'
import Book from './book'

class Author extends Bookshelf.Model {
  get tableName () {
    return 'tags'
  }

  books () {
    return this.belongsToMany(Book)
  }

  static getAll () {
    this.fetchAll().then(results => {
      return results
    })
  }
}

export default Author
