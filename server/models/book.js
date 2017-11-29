import { Model } from 'objection'
import path from 'path'
import request from 'request'
import fs from 'fs'

export default class Book extends Model {
  static get tableName () {
    return 'books'
  }

  static get relationMappings () {
    return {
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'tag'),
        join: {
          from: 'books.id',
          through: {
            from: 'tag_book.book_id',
            to: 'tag_book.tag_id'
          },
          to: 'tags.id'
        },
        authors: {
          relation: Model.ManyToManyRelation,
          modelClass: path.join(__dirname, 'author'),
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
