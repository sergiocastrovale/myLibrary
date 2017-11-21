import { Model } from 'objection'
import Book from './book'

export default class Tag extends Model {
  static tableName = 'tags'

  static relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'Tag.id',
          through: {
            from: 'tags_books.tag_id',
            to: 'tags_books.book_id'
          },
          to: 'Book.id'
        }
      }
    }
  }
}
