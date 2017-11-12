import config from '../knexfile'
import knex from 'knex'
import bookshelf from 'bookshelf'

const Bookshelf = bookshelf(knex(config[process.env.NODE_ENV || 'development']))

Bookshelf.plugin('registry')
Bookshelf.plugin('visibility')
Bookshelf.plugin('pagination')

export default Bookshelf
