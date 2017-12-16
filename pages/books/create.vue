<template>
  <div class="wrapper">
    <div class="search">
      <h2>Search for a book</h2>
      <h4>
        Alternatively, you can
        <nuxt-link to="/books/add" exact>
          <span>add your book manually</span>
        </nuxt-link>
        too.
      </h4>

      <form @submit.prevent.stop="search" class="mt-3">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" v-model="query" placeholder="Enter something..."></input>
      </form>
    </div>

    <div class="inside">
      <component v-if="loading" :is="loader"></component>
      <div v-else>
        <component v-if="adding" :is="loader"></component>

        <div v-else>
          <ul v-if="results" class="list">
            <li v-for="(book, index) in results" :key="index">
              <div class="add fs-largest p-3" @click="create(book)" title="Add to your collection">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </div>

              <div class="d-flex p-3">
                <div class="cover bg-lighter border-light mr-3">
                  <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.smallThumbnail">
                </div>

                <div class="details">
                  <h3>{{ book.volumeInfo.title }}</h3>

                  <ul class="fs-small">
                    <li v-if="book.volumeInfo.authors" class="mb-1">
                      by {{ book.volumeInfo.authors.join(', ') }}
                    </li>
                    <li>
                      <span v-if="book.volumeInfo.publishedDate">
                        Published in {{ book.volumeInfo.publishedDate }} |
                      </span>

                      <span v-if="book.volumeInfo.pageCount > 0">{{ book.volumeInfo.pageCount }} pages</span>
                    </li>
                    <li>
                      <span v-for="identifier in book.volumeInfo.industryIdentifiers" :key="identifier.type">
                        {{ identifier.type }}: {{ identifier.identifier }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Dots from '~/components/dots'

  export default {
    data: () => ({
      loader: 'dots',
      loading: false,
      adding: false,
      query: 'music history',
      results: null
    }),
    async fetch ({ store }) {
      await store.dispatch('books/updateList')
    },
    methods: {
      async search () {
        let response = null

        try {
          this.loading = true

          response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.query + '&maxResults=40')

          if (response.data && response.data.items !== undefined) {
            this.results = response.data.items
            this.loading = false
          }
        } catch (e) {
          this.$toast.error('Something happened while searching. Please try again later!')
        }
      },
      async create (book) {
        let response = null
        console.log('auth', this.$store.state.auth)
        let data = {
          user: this.$store.state.auth.user,
          book: book
        }
        let found = await axios.get('/api/books/findByGoogleId/:googleId', { params: {
          googleId: book.id
        }})

        // Test if the book already exists. If it does, we'll warn the user and
        // switch the add button for a 'remove'.
        // If it doesn't, we'll add the book to our collection.

        if (found.status === 200 && found.data) {
          this.$toast.error('This book is already on your collection!')
        } else {
          try {
            this.adding = true

            response = await axios.post('/api/book/create', data)

            if (response.data) {
              this.$store.dispatch('books/updateList')
              this.adding = false
              this.$toast.success('Book added to your library!')
            }
          } catch (e) {
            this.$toast.error('Something happened while trying to add your book :( Please try again!')
          }
        }
      }
    },
    components: {
      Dots
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';

  .cover {
    width: 40px;
    height: 60px;

      > img {
        margin-right: 5px;
        width: 40px;
        align-self: center;
      }
  }

  .add {
    border-right: 1px solid $light;
    display: flex;
    align-items: center;
    color: $dark;

    &:hover {
      background: $green;
      color: $lightest;
      cursor: pointer;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right-color: $green;
    }
  }
</style>