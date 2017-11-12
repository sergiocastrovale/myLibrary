import Bookshelf from '../../db/database'
import Tag from '../models/tag'
import Author from '../models/author'
import fs from 'fs'
import request from 'request'

class Book extends Bookshelf.Model {
  get tableName () {
    return 'books'
  }

  get hasTimestamps () {
    return true
  }

  tags () {
    return this.belongsToMany(Tag)
  }

  authors () {
    return this.belongsToMany(Author)
  }

  static retrieveISBN (data, type) {
    const isbn = data.find(i => i.type === 'ISBN_' + type)

    return (isbn && isbn.identifier !== undefined) ? isbn.identifier : ''
  }

  // Auxiliary function that checks if given tags exist on
  // the database and processes them otherwise

  static dealWithTags (tags) {
    let list = []

    tags.forEach(c => {
      Tag.insert(
        Tag.select(c.name).whereNotExists(Tag.where('name', c.name))
      ).then((res) => {
        list.push(res.id)
      }).catch((error) => {
        console.log(error)
      })
    })

    return list
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

export default Book
