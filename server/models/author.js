import path from 'path'
import { Model } from 'objection'

export default class Author extends Model {
  static get tableName () {
    return 'authors'
  }

  static get relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Book'),
        join: {
          from: 'authors.id',
          through: {
            from: 'author_book.author_id',
            to: 'author_book.book_id'
          },
          to: 'books.id'
        }
      }
    }
  }
}
