import path from 'path'
import fs from 'fs'
import request from 'request'
import knex from '../../db/knex'

const bookController = {}

bookController.get = (req, res) => {
  knex.select('id', 'googleId', 'intro', 'pageCount', 'title', 'updated_at').from('books').then((results) => {
    return res.status(200).json(results)
  }).catch((error) => {
    return res.status(400).json(error)
  })
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

  knex('books').where({googleId: data.id}).first().then((row) => {
    if (row === undefined) {
      // Insert the new book on the database.

      knex('books').insert({
        title: vol.title,
        subtitle: vol.subtitle,
        googleId: data.id,
        intro: data.searchInfo.textSnippet,
        description: vol.description,
        pageCount: vol.pageCount,
        publisher: vol.publisher,
        publishedDate: vol.publishedDate
      }).then((result) => {
        return res.status(200).json(result)
      }).catch((error) => {
        return res.status(400).json(error)
      })
    }
  }).then(() => {
    return res.status(200).json('Duplicate. Nothing done')
  })
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
