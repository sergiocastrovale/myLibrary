import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex'
import { Nuxt, Builder } from 'nuxt'
import { Model } from 'objection'
import api from './api'
import knexConfig from '../knexfile'
import passport from 'passport'
import credentials from './config/credentials'
import User from './models/user'

const LocalStrategy = require('passport-local').Strategy
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

// Passport.js
app.use(passport.initialize())
app.use(passport.session())

// Bind all Models to a knex instance
Model.knex(knex)

// Import API Routes
app.use('/api', api)

// Auth strategies
passport.use(new LocalStrategy((username, password, done) => {
  User.query()
    .where('username', '=', username)
    .first()
    .then(user => {
      if (!user) {
        User.query().insert({ username: username, password: password }).then(createdUser => {
          return done(null, createdUser)
        }).catch(error => {
          console.log('Error while inserting new user', error)
        })
      } else {
        if (user.username !== username || user.password !== password) {
          return done(null, false, { message: 'Incorrect username or password.' })
        } else {
          done(null, user)
        }
      }
    }).catch(error => {
      console.log('Error while trying user', error)
    })
}))

passport.use(new GoogleStrategy({
  clientID: credentials.google.clientID,
  clientSecret: credentials.google.clientSecret,
  callbackURL: credentials.google.callbackURL
}, (accessToken, refreshToken, profile, done) => {
  User.query()
    .where('googleId', '=', profile.id)
    .first()
    .then(user => {
      console.log('User is', user)

      if (!user) {
        User.query().insert({ username: 'bla', googleId: profile.id }).then(createdUser => {
          console.log('User inserted!', createdUser)
          return done(null, createdUser)
        }).catch(error => {
          console.log('Error while inserting new user', error)
        })
      } else {
        done(null, user)
      }
    }).catch(error => {
      console.log('Error while trying user', error)
      return done(null, false, { message: 'Error when logging in ' + error })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.query()
    .findOne(id)
    .then(user => {
      done(null, user)
    }).catch(error => {
      console.log('Error while deserializing user', error)
    })
})

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
