import Book from '../models/book'
import Author from '../models/author'
import Tag from '../models/tag'
import UserBook from '../models/userBook'
import path from 'path'

const bookController = {}

// Sets the list of books.

bookController.getAll = (req, res) => {
  const params = req.query
  const from = params.page * params.size - params.size
  const to = params.page * params.size - 1

  Book.query()
    .joinEager('[users, authors, tags]')
    .orderBy('title')
    .range(from, to)
    .then(results => {
      res.status(200).json(results)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Searches in your collection of books. This is a good example
// of querying via GET route.

bookController.searchInCollection = (req, res) => {
  const query = req.params.query

  if (query !== undefined && query.length > 2) {
    Book.query()
      .joinEager('[authors, users, tags]')
      .orderBy('title')
      .where('title', 'like', '%' + query + '%')
      .orWhere('isbn10', 'like', '%' + query + '%')
      .orWhere('isbn13', 'like', '%' + query + '%')
      .orWhere('publisher', 'like', '%' + query + '%')
      .then(books => {
        res.status(200).json(books)
      }).catch(error => {
        res.status(500).json(error.message)
      })
  } else {
    bookController.getAll(req, res)
  }
}

bookController.findByGoogleId = (req, res) => {
  Book.query()
    .joinEager('users')
    .where('users.id', '=', req.query.userId)
    .where('googleId', '=', req.query.googleId)
    .first()
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Removes a book from the logged in user's collection.
// Does not remove the book from the overall list of books;
// the purpose of this app is to store as many books as possible,
// even if nobody owns them!

bookController.remove = (req, res) => {
  UserBook.query()
    .where('userId', '=', req.body.userId)
    .where('bookId', '=', req.body.bookId)
    .first()
    .delete()
    .then(deletedRows => {
      res.status(200).json(deletedRows)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Inserts a book with information provided via Google Books

bookController.create = (req, res) => {
  const user = req.body.user
  const data = req.body.book
  const vol = data.volumeInfo

  Book.query()
    .where('googleId', '=', data.id)
    .first()
    .then(found => {
      // Book not found? Add it and then relate it to our user
      // Book found? We only need to sync to our user

      if (!found) {
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
          language: vol.language,
          url: vol.canonicalVolumeLink,
          description: vol.description,
          pageCount: vol.pageCount,
          publisher: vol.publisher,
          publishedDate: vol.publishedDate,
          fetched: true
        }).then(book => {
          // Tie this book to the logged in user

          book.$relatedQuery('users').relate(user.id).then(updatedRows => {})

          // Insert authors and associate them with the new book.
          // If the author already exists, we'll just "relate it" with the book

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
                    .then(addedTag => {})
                    .catch(error => {
                      res.status(500).json(error.message)
                    })
                }
              }).catch(error => {
                res.status(500).json(error.message)
              })
          })

          res.status(200).json({ success: true, synced: false, book: book })
        }).catch(error => {
          res.status(500).json(error.message)
        })
      } else {
        // Sync the book with the user if not found on his collection.
        // Otherwise, we'll just send the book we already have

        Book.query()
          .joinEager('users')
          .where('users.id', '=', user.id)
          .where('googleId', '=', found.googleId)
          .first()
          .then(ownsIt => {
            if (ownsIt) {
              res.status(200).json({ success: false, synced: true, book: found })
            } else {
              found.$relatedQuery('users').relate(user.id).then(updatedRows => {
                res.status(200).json({ success: true, synced: true, book: found })
              })
            }
          }).catch(error => {
            res.status(500).json(error.message)
          })
      }
    })
}

bookController.add = (req, res) => {
  const data = req.body
  
  // Make sure we set this book as a manual entry
  data.fetched = false

  Book.query().insert(data)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.edit = (req, res) => {
  Book.query()
    .findById(req.params.id)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.doEdit = (req, res) => {
  const book = req.body.book

  Book.query()
    .patchAndFetchById(book.id, book)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Updates the current UserBook object with the opposite status for isFavorite

bookController.toggleFavorite = (req, res) => {
  UserBook.query()
    .where('userId', '=', req.body.userId)
    .where('bookId', '=', req.body.bookId)
    .first()
    .then(current => {
      if (current) {
        current.$query()
          .patchAndFetchById(current.id, {
            isFavorite: !current.isFavorite
          }).then(book => {
            res.status(200).json(book)
          }).catch(error => {
            res.status(500).json(error.message)
          })
      }
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.updateFile = (req, res) => {
  UserBook.query()
    .where('userId', '=', req.body.userId)
    .where('bookId', '=', req.body.bookId)
    .first()
    .patch({ file: req.body.file })
    .then(updated => {
      res.status(200).json(updated)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.filterByFavorites = (req, res) => {
  Book.query()
    .joinEager('[authors, users, tags]')
    .where('isFavorite', '=', true) // How can I reach this property of the book_user table?
    .orderBy('title')
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Retrieves all books with a file on a given user's collection

bookController.filterByPDF = (req, res) => {
  Book.query()
    .eager('authors')
    .eager('users')
    .where('file', 'IS NOT', null)
    .orderBy('title')
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

// Retrieves a collection of all books from a given user's id

bookController.filterByUser = (req, res) => {
  Book.query()
    .joinEager('[authors, users, tags]')
    .where('users.id', req.params.id)
    .orderBy('title')
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

export default bookController
