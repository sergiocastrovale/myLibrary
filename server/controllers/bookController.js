import Book from '../models/book'
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

        Book.createFromGoogleBooks(googleBook).then(book => {
          // Attach relationships
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

          book.attachUser(user)

          // Download cover file
          Book.addCover(googleBook)

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
  Book.addManually(req.body)
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
  Book.edit(req.body.book)
    .then(book => {
      res.status(200).json(book)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.toggleFavorite = (req, res) => {
  UserBook.findMyBook(req.body.userId, req.body.bookId)
    .then(current => {
      if (current) {
        current.toggleFavorite()
          .then(book => {
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
  UserBook.editFile(req.body.userId, req.body.bookId, req.body.file)
    .then(updated => {
      res.status(200).json(updated)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.updateNotes = (req, res) => {
  UserBook.editNotes(req.body.userId, req.body.bookId, req.body.notes)
    .then(updated => {
      res.status(200).json(updated)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.filterByFavorites = (req, res) => {
  Book.filterByFavorites(req.params.id)
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.filterByPDF = (req, res) => {
  Book.filterByPDF(req.params.id)
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

bookController.filterByUser = (req, res) => {
  Book.filterByUser(req.params.id)
    .then(books => {
      res.status(200).json(books)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

export default bookController
