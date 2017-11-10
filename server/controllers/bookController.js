import path from 'path'
import fs from 'fs'
import request from 'request'
import Bookshelf from '../../db/database'
import Book from '../models/book'

const bookController = {}

bookController.get = (req, res) => {
  const list = Book.getAll()

  res.status(200).json(list)
}

bookController.create = (req, res) => {
  const data = req.body
  const vol = data.volumeInfo
  let uri = data.volumeInfo.imageLinks.thumbnail
  let file = path.join(__dirname, '../uploads/books/' + data.id + '.jpg')

  // Downloads the book cover to the specified path with the Google API's id
  // for a name.

  downloadImage(uri, file, () => {})

  // Search for the current record on our own database. We don't need to add
  // duplicates.

  Book.where({ googleId: data.id }).fetch().then(model => {
    if (model === undefined) {
      // Deal with categories first.

      // let list = dealWithCategories(data.volumeInfo.categories)

      // Check for ISBN identifiers.

      const isbn10 = vol.industryIdentifiers.find(i => i.type === 'ISBN_10')
      const isbn13 = vol.industryIdentifiers.find(i => i.type === 'ISBN_13')

      // Insert the new book on the database.

      new Book(
        {
          title: vol.title,
          subtitle: vol.subtitle,
          isbn10: (isbn10 && isbn10.length > 0 && isbn10[0].identifier !== undefined) ? isbn10[0].identifier : '',
          isbn13: (isbn13 && isbn13.length > 0 && isbn13[0].identifier !== undefined) ? isbn13[0].identifier : '',
          googleId: data.id,
          intro: data.searchInfo.textSnippet,
          description: vol.description,
          pageCount: vol.pageCount,
          publisher: vol.publisher,
          publishedDate: vol.publishedDate
        }
      ).save().then(model => {
        res.status(200).json(model)
      }).catch(error =>
        res.status(500).send(error.message)
      )
    }
  }).then(() => {
    res.status(200).json('Duplicate. Nothing done')
  })
}

// Auxiliary function that checks if given categories exist on
// the database and processes them otherwise

function dealWithCategories (categories) {
  let list = []

  categories.forEach(c => {
    Bookshelf('categories').insert(
      Bookshelf.select(c.name)
        .whereNotExists(bookshelf('categories').where('name', c.name))
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

function downloadImage (uri, file, callback) {
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

export default bookController
