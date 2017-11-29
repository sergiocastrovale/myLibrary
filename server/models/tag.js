import path from 'path'
import { Model } from 'objection'

export default class Tag extends Model {
  static get tableName () {
    return 'tags'
  }

  static get relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Book'),
        join: {
          from: 'tags.id',
          through: {
            from: 'tag_book.tag_id',
            to: 'tag_book.book_id'
          },
          to: 'books.id'
        }
      }
    }
  }
}
