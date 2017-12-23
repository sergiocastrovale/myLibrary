import { Model } from 'objection'

export default class Tag extends Model {
  static get tableName () {
    return 'tags'
  }

  static get relationMappings () {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./book').default,
        join: {
          from: 'tags.id',
          through: {
            from: 'tag_book.tagId',
            to: 'tag_book.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }

  // Finds a tag by name.

  static findByName (name) {
    return this.query()
      .where('name', '=', name)
      .first()
  }
}
