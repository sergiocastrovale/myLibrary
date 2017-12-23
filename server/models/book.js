import { Model } from 'objection'
import Author from './author'
import Tag from './tag'
import request from 'request'
import fs from 'fs'
import path from 'path'

export default class Book extends Model {
  static get tableName () {
    return 'books'
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./user').default,
        join: {
          from: 'books.id',
          through: {
            from: 'user_book.bookId',
            to: 'user_book.userId',
            extra: ['isFavorite', 'notes', 'file']
          },
          to: 'users.id'
        }
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./tag').default,
        join: {
          from: 'books.id',
          through: {
            from: 'tag_book.bookId',
            to: 'tag_book.tagId'
          },
          to: 'tags.id'
        }
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./author').default,
        join: {
          from: 'books.id',
          through: {
            from: 'author_book.bookId',
            to: 'author_book.authorId'
          },
          to: 'authors.id'
        }
      }
    }
  }

  static retrieveISBN (data, type) {
    let isbn = ''

    if (data) {
      isbn = data.find(i => i.type === 'ISBN_' + type)
    }

    return (isbn && isbn.identifier !== undefined) ? isbn.identifier : ''
  }

  // Retrieves the list of books.

  static list (from, to) {
    return this.query()
      .joinEager('[users, authors, tags]')
      .orderBy('title')
  }

  // Retrieves the paginated list of books along
  // with related models.

  static paginatedList (from, to) {
    return this.list().range(from, to)
  }

  // Searches in your collection of books. If the search query
  // has less than 2 characters, retrieves the full list of books.

  static search (query) {
    if (query !== undefined && query.length > 2) {
      return this.query()
        .joinEager('[authors, users, tags]')
        .orderBy('title')
        .where('title', 'like', '%' + query + '%')
        .orWhere('isbn10', 'like', '%' + query + '%')
        .orWhere('isbn13', 'like', '%' + query + '%')
        .orWhere('publisher', 'like', '%' + query + '%')
    } else {
      return this.list()
    }
  }

  // Retrieves a specific book by googleId.

  static findByGoogleId (googleId) {
    return Book.query()
      .where('googleId', '=', googleId)
      .first()
  }

  // Inserts a book with information provided via Google Books

  static createFromGoogleBooks (googleBook) {
    const data = googleBook.volumeInfo

    return this.query()
      .insert({
        googleId: googleBook.id,
        title: data.title,
        subtitle: data.subtitle,
        isbn10: this.retrieveISBN(data.industryIdentifiers, '10'),
        isbn13: this.retrieveISBN(data.industryIdentifiers, '13'),
        intro: (data.searchInfo && data.searchInfo.textSnippet) ? data.searchInfo.textSnippet : '',
        language: data.language,
        url: data.canonicalVolumeLink,
        description: data.description,
        pageCount: data.pageCount,
        publisher: data.publisher,
        publishedDate: data.publishedDate,
        fetched: true
      })
  }

  // Downloads the book cover using the Google API's id as name.

  static addCover (data) {
    const uri = data.volumeInfo.imageLinks.thumbnail
    const file = path.join(__dirname, '../../static/uploads/books/' + data.id + '.jpg')

    request.head(uri, function (err, res, body) {
      if (err) {
        console.log('Error downloading cover', err, file)
      } else {
        let stream = request(uri)

        if (stream) {
          stream.pipe(fs.createWriteStream(file)
            .on('error', function (err) {
              console.log('Error downloading cover', err, file)
              stream.read()
            })
          )
        }
      }
    })
  }

  // Attaches a given author to a book.
  // If the author doesn't exist adds it.

  static attachAuthor (book, author) {
    Author.findByName(author)
      .then(found => {
        if (found) {
          book.$relatedQuery('authors').relate(found.id)
        } else {
          book.$relatedQuery('authors')
            .insert({ name: author })
            .then(addedAuthor => {})
            .catch(error => {
              console.log('Error relating author to book', error)
            })
        }
      })
  }

  // Attaches a given author to a book.
  // If the author doesn't exist adds it.

  static attachTag (book, tag) {
    Tag.findByName(tag)
      .then(found => {
        if (found) {
          book.$relatedQuery('tags').relate(found.id)
        } else {
          book.$relatedQuery('tags')
            .insert({ name: tag })
            .then(addedTag => {})
            .catch(error => {
              console.log('Error relating tag to book', error)
            })
        }
      })
  }

  // Adds the current book to a user's collection.

  static attachUser (book, user) {
    return book.$relatedQuery('users').relate(user.id)
  }

  // Retrieves a given book provided that the current user has it
  // in his collection.

  static findMyBookByGoogleId (userId, googleId) {
    return this.query()
      .joinEager('users')
      .where('users.id', '=', userId)
      .where('googleId', '=', googleId)
      .first()
  }
}
