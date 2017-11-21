import path from 'path'
import { Model } from 'objection'
import Book from './book'

export default class Author extends Model {
  static tableName = 'authors'

  static relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'Author.id',
          through: {
            from: 'authors_books.author_id',
            to: 'authors_books.book_id'
          },
          to: 'Book.id'
        }
      }
    }
  }
}
