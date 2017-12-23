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
      query: '',
      results: null
    }),
    async fetch ({ store }) {
      await store.dispatch('books/updateList')
    },
    created () {
      const strings = [
        'chopin',
        'mozart',
        'bach',
        'beethoven',
        'ancient greece',
        'ancient rome',
        'romantic period',
        'medieval music',
        'bartok',
        'liszt',
        'sonata',
        'orchestra',
        'stravinsky',
        'kurt sachs',
        'orff',
        'verdi'
      ]
      const n = Math.floor(Math.random() * strings.length)

      this.query = strings[n]
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
        let user = this.$store.state.auth.user
        let response = null
        let data = {
          user: user,
          book: book
        }

        // Upon adding, we test if the book already exists.
        // If it doesn't, two things can happen:
        // 1) The book doesn't exist: we'll add the book and then sync to our collection
        // 2) The book already exists because someone else added it: we'll sync to our collection only
        // this.$toast.error('This book is already on your collection!')

        try {
          this.adding = true

          response = await axios.post('/api/book/create', data)

          if (response.status === 200 && response.data) {
            const data = response.data
            const title = data.book.title

            if (data.success) {
              if (data.synced) {
                this.$toast.success(title + ' merged into your collection!')
              } else {
                this.$toast.success(title + ' added to your collection!')
              }
            } else {
              if (data.synced) {
                this.$toast.error(title + ' is already on your collection!')
              } else {
                this.$toast.error('Huh. An unknown error occurred!')
              }
            }

            this.$store.dispatch('books/updateList')
            this.adding = false
          }
        } catch (e) {
          this.$toast.error('Something happened while trying to add your book :( Please try again!')
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