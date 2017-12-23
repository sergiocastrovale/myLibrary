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

  // Retrieves a specific book <-> user relationship,
  // given the book and user id.

  static findMyBook (userId, bookId) {
    return this.query()
      .where('userId', '=', userId)
      .where('bookId', '=', bookId)
      .first()
  }

  // Removes a book from the logged in user's collection.
  // Does not remove the book from the overall list of books;
  // the purpose of this app is to store as many books as possible,
  // even if nobody owns them!

  static deleteMyBook (userId, bookId) {
    return this.findMyBook(userId, bookId).delete()
  }
}
