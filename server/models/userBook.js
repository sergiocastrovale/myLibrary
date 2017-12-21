import { Model } from 'objection'

export default class UserBook extends Model {
  static get tableName () {
    return 'user_book'
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: require('./user').default,
      join: {
        from: 'user_book.userId',
        to: 'users.id'
      }
    },
    book: {
      relation: Model.BelongsToOneRelation,
      modelClass: require('./book').default,
      join: {
        from: 'user_book.bookId',
        to: 'books.id'
      }
    }
  }
}
