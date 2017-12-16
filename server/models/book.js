import { Model } from 'objection'
import request from 'request'
import fs from 'fs'

export default class Book extends Model {
  static get tableName () {
    return 'books'
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./user').default,
        join: {
          from: 'books.id',
          through: {
            from: 'user_book.book_id',
            to: 'user_book.user_id'
          },
          to: 'users.id'
        }
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./tag').default,
        join: {
          from: 'books.id',
          through: {
            from: 'tag_book.book_id',
            to: 'tag_book.tag_id'
          },
          to: 'tags.id'
        }
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./author').default,
        join: {
          from: 'books.id',
          through: {
            from: 'author_book.book_id',
            to: 'author_book.author_id'
          },
          to: 'authors.id'
        }
      }
    }
  }

  static retrieveISBN (data, type) {
    let isbn = ''

    if (data) {
      isbn = data.find(i => i.type === 'ISBN_' + type)
    }

    return (isbn && isbn.identifier !== undefined) ? isbn.identifier : ''
  }

  // Auxiliary function that creates a writing stream so we can
  // download book covers.

  static downloadImage (uri, file, callback) {
    request.head(uri, function (err, res, body) {
      if (err) {
        callback(err, file)
      } else {
        let stream = request(uri)

        if (stream) {
          stream.pipe(fs.createWriteStream(file)
            .on('error', function (err) {
              callback(err, file)
              stream.read()
            })
          ).on('close', function () {
            callback(null, file)
          })
        }
      }
    })
  }
}
