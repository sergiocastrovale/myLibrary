import Book from '../models/book'
import path from 'path'

const bookController = {}

bookController.get = (req, res) => {
  return Book.query()
    .orderBy('title')
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.create = (req, res) => {
  const data = req.body
  const vol = data.volumeInfo

  // Book.query().insert({
  //   title: vol.title,
  //   subtitle: vol.subtitle,
  //   isbn10: Book.retrieveISBN(vol.industryIdentifiers, '10'),
  //   isbn13: Book.retrieveISBN(vol.industryIdentifiers, '13'),
  //   googleId: data.id,
  //   intro: (data.searchInfo.textSnippet !== undefined) ? data.searchInfo.textSnippet : '',
  //   description: vol.description,
  //   pageCount: vol.pageCount,
  //   publisher: vol.publisher,
  //   publishedDate: vol.publishedDate
  // }).then(book => {
  //   res.status(200).json({
  //     obj: book,
  //     message: 'Book added successfully!'
  //   })
  // }).catch(error => {
  //   res.status(500).json(error.message)
  // })

  Book.query()
    .where('googleId', '=', data.id)
    .then(response => {
      if (response.length === 0) {
        const uri = data.volumeInfo.imageLinks.thumbnail
        const file = path.join(__dirname, '../uploads/books/' + data.id + '.jpg')

        // Downloads the book cover to the specified path with the Google API's id
        // for a name.

        Book.downloadImage(uri, file, () => {})

        // let list = this.dealWithTags(data.volumeInfo.categories)

        Book.query().insert({
          title: vol.title,
          subtitle: vol.subtitle,
          isbn10: Book.retrieveISBN(vol.industryIdentifiers, '10'),
          isbn13: Book.retrieveISBN(vol.industryIdentifiers, '13'),
          googleId: data.id,
          intro: data.searchInfo.textSnippet,
          description: vol.description,
          pageCount: vol.pageCount,
          publisher: vol.publisher,
          publishedDate: vol.publishedDate
        }).then(book => {
          res.status(200).json({
            obj: book,
            message: 'Book added successfully!'
          })
        }).catch(error => {
          res.status(500).json(error.message)
        })
      } else {
        res.status(200).json('You already have this book in your library! Skipping ...')
      }
    })
}

export default bookController
