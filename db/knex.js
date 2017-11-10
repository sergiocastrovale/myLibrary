const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

// Load bookshelf.js

module.exports = require('bookshelf')(knex)
