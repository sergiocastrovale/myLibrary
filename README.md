# myLibrary: A playground turned actually useful app

This project started out as a playground to improve my knowledge on some technologies. As it grew, I found out that keeping track of my eBook collection and wishlist is
something I actually needed, so I'm continuously updating things and adding new features as I see fit.

## What's next

This is by no means a finished app and there might be bugs and unpolished features here and there. Feel free to submit PRs if you'd like :-)

## Tech stack

* Node.js + Express
* Vue.js + Nuxt
* Knex
* Objection.js
* Ava E2E test suite
* Google Books API
* MySQL
* Backpack to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.)

## Setup guide

### Installation

``` bash
# Install the knex query builder (knexjs.org)
$ npm install -g knex

# Install project dependencies
$ npm install
```

### Database setup

* Copy the knexfile.example.js to knexfile.js
* Update the needed credentials on knexfile.js

``` js
  module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'myusername',     // Replace this
        password: 'mypassword', // Replace this
        database: 'mydatabase'  // Replace this
      },
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      },
      useNullAsDefault: true
    }
  }
```

## Running the project

### For local development serve with hot reload at localhost:3000

``` bash
$ npm run dev
```

### For production run build and then launch server

``` bash
$ npm run build
$ npm start
```