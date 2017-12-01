import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex'
import { Nuxt, Builder } from 'nuxt'
import { Model } from 'objection'
import api from './api'
import knexConfig from '../knexfile'
import passport from 'passport'
import credentials from './config/credentials'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Initialize knex
const knex = Knex(knexConfig.development)

app.set('port', port)

// Load express bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Bind all Models to a knex instance
Model.knex(knex)

// Import API Routes
app.use('/api', api)

// OAuth
app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy(credentials.google,
  (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile)
  }
))

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
