<template>
  <div class="p-3">
    <form @submit.prevent.stop="search">
      <input type="text" v-model="query" placeholder="Enter something..."></input>
    </form>

    <ul v-if="results" class="results">
      <li v-for="(book, index) in results" :key="index" class="d-flex border-light bg-white radius-small my-2">
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
              <li v-if="book.volumeInfo.authors" class="mb-1">by {{ book.volumeInfo.authors.join(', ') }}</li>
              <li>
                <span v-if="book.volumeInfo.publishedDate">Published in {{ book.volumeInfo.publishedDate }} | </span>
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
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      loading: false,
      query: 'music history',
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
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.query + '&maxResults=40')

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
      background: $yes;
      color: $white;
      cursor: pointer;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right-color: $yes;
    }
  }
</style>