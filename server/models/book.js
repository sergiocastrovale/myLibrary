import { Model } from 'objection'
import Author from './author'
import Tag from './tag'
import request from 'request'
import fs from 'fs'
import path from 'path'

export default class Book extends Model {
  static tableName = 'books'

  static relationMappings () {
    return {
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
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
          modelClass: Author,
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
    const isbn = data.find(i => i.type === 'ISBN_' + type)

    return (isbn && isbn.identifier !== undefined) ? isbn.identifier : ''
  }

  // Auxiliary function that checks if given tags exist on
  // the database and processes them otherwise

  static dealWithTags (tags) {

  }

  // Auxiliary function that creates a writing stream so we can
  // download book covers.

  static downloadImage (uri, file, callback) {
    request.head(uri, function (err, res, body) {
      if (err) {
        callback(err, file)
      } else {
        let stream = request(uri)

        stream.pipe(fs.createWriteStream(file)
          .on('error', function (err) {
            callback(err, file)
            stream.read()
          })
        ).on('close', function () {
          callback(null, file)
        })
      }
    })
  }
}
