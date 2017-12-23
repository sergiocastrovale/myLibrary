import Book from '../models/book'
import Author from '../models/author'
import Tag from '../models/tag'
import UserBook from '../models/userBook'

const bookController = {}

bookController.getAll = (req, res) => {
  const params = req.query
  const from = params.page * params.size - params.size
  const to = params.page * params.size - 1

  Book.paginatedList(from, to)
    .then(results => {
      res.status(200).json(results)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.searchInCollection = (req, res) => {
  Book.search(req.params.query)
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.remove = (req, res) => {
  UserBook.deleteMyBook(req.body.userId, req.body.bookId)
    .then(deletedRows => {
      res.status(200).json(deletedRows)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.create = (req, res) => {
  const user = req.body.user
  const googleBook = req.body.book

  Book.findByGoogleId(googleBook.id)
    .then(found => {
      // Book not found? Add it and then relate it to our user
      // Book found? We only need to sync to our user

      if (!found) {
        const tags = googleBook.volumeInfo.categories
        const authors = googleBook.volumeInfo.authors

        Book.createFromGoogleBooks(googleBook)
          .then(book => {
            if (authors) {
              authors.forEach(author => {
                Book.attachAuthor(book, author)
              })
            }

            if (tags) {
              tags.forEach(tag => {
                Book.attachTag(book, tag)
              })
            }
            
            Book.addCover(googleBook)
            book.attachUser(user)

            res.status(200).json({ success: true, synced: false, book: book })
          }).catch(error => {
            res.status(500).json(error.message)
          })
      } else {
        // Sync the book with the user if not found on his collection.
        // Otherwise, we'll just send the book we already have

        Book.findMyBookByGoogleId(user.id, found.googleId)
          .then(ownsIt => {
            if (ownsIt) {
              res.status(200).json({ success: false, synced: true, book: found })
            } else {
              found.attachUser(user)
                .then(attached => {
                  res.status(200).json({ success: true, synced: true, book: found })
                })
                .catch(error => {
                  res.status(500).json(error.message)
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
