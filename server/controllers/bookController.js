import Book from '../models/book'
import path from 'path'

const bookController = {}

bookController.get = (req, res) => {
  Book.forge()
    .orderBy('-title')
    .fetchPage({
      pageSize: 4,
      page: 1
    })
    .then(list => {
      res.status(200).json(list)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.create = (req, res) => {
  const data = req.body

  new Book()
    .query({where: { googleId: data.googleId }})
    .fetchOne()
    .then(found => {
      if (!found) {
        const vol = data.volumeInfo
        const uri = data.volumeInfo.imageLinks.thumbnail
        const file = path.join(__dirname, '../uploads/books/' + data.id + '.jpg')

        // Downloads the book cover to the specified path with the Google API's id
        // for a name.

        new Book().downloadImage(uri, file, () => {})

        // let list = this.dealWithTags(data.volumeInfo.categories)

        new Book({
          title: vol.title,
          subtitle: vol.subtitle,
          isbn10: this.retrieveISBN(vol.industryIdentifiers, '10'),
          isbn13: this.retrieveISBN(vol.industryIdentifiers, '13'),
          googleId: data.id,
          intro: data.searchInfo.textSnippet,
          description: vol.description,
          pageCount: vol.pageCount,
          publisher: vol.publisher,
          publishedDate: vol.publishedDate
        }).save().then(model => {
          res.status(200).json({
            obj: model,
            message: 'Book added successfully!'
          })
        }).catch(error => {
          res.status(500).json({
            obj: null,
            message: error.message
          })
        })
      } else {
        res.status(200).json({
          obj: found,
          message: 'You already have this book in your library! Skipping ...'
        })
      }
    })
}

export default bookController
