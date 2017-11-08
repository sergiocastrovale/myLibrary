<template>
  <section class="container">
    <div v-if="loading" class="loading">
      Loading, please wait ...
    </div>

    <div class="books">
      <h1>My collection ({{ books.length }} books)</h1>

      <ul>
        <li v-for="(book, index) in books" :key="index">
          {{ book.title }}
        </li>
      </ul>
    </div>

    <div class="search">
      <form @submit.prevent.stop="search">
        <select v-model="selectedField">
          <option v-for="(field, index) in fields" :key="index" :value="field.value">
            {{ field.label }}
          </option>
        </select>
        <input type="text" v-model="query">
      </form>

      <ul v-if="results">
        <li v-for="(book, index) in results" :key="index">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail"
            class ="img-thumbnail img-responsive">

          {{ book.volumeInfo.title }}

          <button @click="create(book)">Add</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      loading: false,
      fields: [
        { label: 'Title', value: 'title' },
        { label: 'ISBN', value: 'isbn' }
      ],
      selectedField: 'title',
      query: 'fahrenheit',
      searchResults: null
    }
  },
  async fetch ({ store }) {
    await store.dispatch('updateBooks')
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    results () {
      return this.searchResults ? this.searchResults.items : null
    },
    total () {
      return this.searchResults ? this.searchResults.totalItems : 0
    }
  },
  methods: {
    async search () {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.selectedField + ':' + this.query)

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
  },
  head () {
    return {
      title: 'Books'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-between;
  }

  .books {
    width: 70vw;
  }

  .search {
    width: 30vw;

    > li {
      overflow: hidden;
    }
  }
</style>
