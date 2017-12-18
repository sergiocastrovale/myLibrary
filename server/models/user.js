import { Model } from 'objection'
import bcrypt from 'bcrypt'

export default class User extends Model {
  // Always hash passwords before inserting

  $beforeInsert () {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./book').default,
        join: {
          from: 'users.id',
          through: {
            from: 'user_book.userId',
            to: 'user_book.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }

  // Match a raw password against the bcrypted hash

  passwordsMatch (password) {
    return bcrypt.compareSync(password, this.password)
  }
}
