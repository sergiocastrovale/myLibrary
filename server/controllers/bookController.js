import Book from '../models/book'
import Author from '../models/author'
import Tag from '../models/tag'
import path from 'path'

const bookController = {}

bookController.get = (req, res) => {
  return Book.query()
    .eager('authors')
    .orderBy('title')
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.create = (req, res) => {
  res.status(200).json('')
}

bookController.doCreate = (req, res) => {
  const data = req.body
  const vol = data.volumeInfo

  Book.query()
    .where('googleId', '=', data.id)
    .then(response => {
      if (response.length === 0) {
        const uri = data.volumeInfo.imageLinks.thumbnail
        const file = path.join(__dirname, '../../static/uploads/books/' + data.id + '.jpg')
        const intro = (data.searchInfo && data.searchInfo.textSnippet) ? data.searchInfo.textSnippet : ''

        // Download the book cover using the Google API's id as name

        Book.downloadImage(uri, file, () => {})

        Book.query().insert({
          title: vol.title,
          subtitle: vol.subtitle,
          isbn10: Book.retrieveISBN(vol.industryIdentifiers, '10'),
          isbn13: Book.retrieveISBN(vol.industryIdentifiers, '13'),
          googleId: data.id,
          intro: intro,
          description: vol.description,
          pageCount: vol.pageCount,
          publisher: vol.publisher,
          publishedDate: vol.publishedDate
        }).then(book => {
          // Insert authors and associate them with the new book.
          // If the author already exists, we'll just "relate it" with the book.

          vol.authors.forEach(author => {
            Author.query()
              .where('name', '=', author)
              .first()
              .then(foundAuthor => {
                if (foundAuthor) {
                  book.$relatedQuery('authors').relate(foundAuthor.id)
                } else {
                  book
                    .$relatedQuery('authors')
                    .insert({ name: author })
                    .then(addedAuthor => {
                      console.log('Added ', addedAuthor)
                    })
                    .catch(error => {
                      res.status(500).json(error.message)
                    })
                }
              }).catch(error => {
                res.status(500).json(error.message)
              })
          })

          // Insert tags (categories from google books) and associate them with the new book.
          // If the tag already exists, we'll just "relate it" with the book.

          vol.categories.forEach(tag => {
            Tag.query()
              .where('name', '=', tag)
              .first()
              .then(foundTag => {
                if (foundTag) {
                  book.$relatedQuery('tags').relate(foundTag.id)
                } else {
                  book
                    .$relatedQuery('tags')
                    .insert({ name: tag })
                    .then(addedTag => {
                      console.log('Added ', addedTag)
                    })
                    .catch(error => {
                      res.status(500).json(error.message)
                    })
                }
              }).catch(error => {
                res.status(500).json(error.message)
              })
          })

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

bookController.add = (req, res) => {
  res.status(200).json('')
}

bookController.doAdd = (req, res) => {
  const data = req.body

  Book.query().insert(data)
    .then(book => {
      res.status(200).json(data)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.edit = (req, res) => {
  Book.query()
    .findById(req.body.id)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.doEdit = (req, res) => {
  const data = req.body
  const id = data.id

  Book.query()
    .patchAndFetchById(id, data)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.doAddToFavorites = (req, res) => {
  const id = req.body.id

  Book.query()
    .patchAndFetchById(id, { isFavorite: Book.raw('NOT ??', ['isFavorite']) })
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.doUpdateFile = (req, res) => {
  console.log(req.body)
  Book.query()
    .patch({ file: req.body.file })
    .where('id', '=', req.body.id)
    .then(updatedBook => {
      res.status(200).json(updatedBook)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

export default bookController
