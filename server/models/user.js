import { Model } from 'objection'

export default class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./book').default,
        join: {
          from: 'user.id',
          through: {
            from: 'user_book.book_id',
            to: 'user_book.user_id'
          },
          to: 'book.id'
        }
      }
    }
  }
}
