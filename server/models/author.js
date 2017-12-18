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
        modelClass: require('./book').default,
        join: {
          from: 'authors.id',
          through: {
            from: 'author_book.authorId',
            to: 'author_book.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }
}
