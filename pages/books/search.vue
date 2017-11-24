<template>
  <div class="p-3">
    <form @submit.prevent.stop="search">
      <input type="text" v-model="query" placeholder="Enter something..."></input>
    </form>

    <ul v-if="results" class="results">
      <li v-for="(book, index) in results" :key="index" @click="create(book)" class="d-flex border-light bg-white radius-small p-1 my-2">
        <img :src="book.volumeInfo.imageLinks.smallThumbnail">

        <div class="details">
          <strong class="d-block">{{ book.volumeInfo.title }}</strong>

          <ul class="fs-small">
            <li class="mb-1">by {{ book.volumeInfo.authors.join(', ') }}</li>
            <li>
              <span v-if="book.volumeInfo.publishedDate">Published in {{ book.volumeInfo.publishedDate }} | </span>
              <span v-if="book.volumeInfo.pageCount > 0">{{ book.volumeInfo.pageCount }} pages</span>
            </li>
            <li>
              <span v-if="book.volumeInfo.industryIdentifiers.length > 0">ISBN-10: {{ book.volumeInfo.industryIdentifiers[0]['identifier'] }} | </span>
              <span v-if="book.volumeInfo.industryIdentifiers.length > 0">ISBN-13: {{ book.volumeInfo.industryIdentifiers[1]['identifier'] }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      loading: false,
      query: 'fahrenheit',
      searchResults: null
    }
  },
  async fetch ({ store }) {
    await store.dispatch('updateBooks')
  },
  computed: {
    results () {
      return this.searchResults ? this.searchResults.items : null
    }
  },
  methods: {
    async search () {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=7&orderBy=relevance&q=' + this.query)

      this.loading = true

      if (res.data !== undefined) {
        this.searchResults = res.data
        this.loading = false
      }
    },
    async create (book) {
      this.loading = true

      axios.post('/api/book/create', book)
        .then((response) => {
          this.$store.dispatch('updateBooks')
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';

  .results {
      > li {
        &:hover {
          cursor: pointer;
          border-color: $primary-color;
        }

        > img {
          margin-right: 5px;
          width: 40px;
          align-self: center;
        }

      .details {
          flex: 1;
      }
    }
  }
</style>