<template>
  <section class="container">
    <form @submit.prevent.stop="search">
      <select v-model="selectedField">
        <option v-for="(field, index) in fields" :key="index" :value="field.value">
          {{ field.label }}
        </option>
      </select>
      <input type="text" v-model="query">
    </form>

    <template v-if="books">
      <h1 class="title">
        Books (found {{ total }} results)
      </h1>

      <ul class="users">
        <li v-for="(book, index) in books" :key="index" class="book">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail"
            class ="img-thumbnail img-responsive">

          {{ book.volumeInfo.title }}
          <!-- <nuxt-link :to="{ name: 'id', params: { id: index }}">
            {{ book.title }}
          </nuxt-link> -->
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      fields: [
        { label: 'Title', value: 'title' },
        { label: 'ISBN', value: 'isbn' }
      ],
      selectedField: 'title',
      query: 'fahrenheit',
      items: null
    }
  },
  created () {
    console.log('here')
  },
  computed: {
    books () {
      return this.items ? this.items.items : null
    },
    total () {
      return this.items ? this.items.totalItems : 0
    }
  },
  methods: {
    async search () {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.selectedField + ':' + this.query)

      if (res.data !== undefined) {
        this.items = res.data
      }
    }
  },
  head () {
    return {
      title: 'Books'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
