<template>
  <div>
    <book-list :books="books"></book-list>
  </div>
</template>

<script>
import BookList from './books/list'

export default {
  async fetch ({ store }) {
    await store.dispatch('updateBooks')
  },
  computed: {
    books () {
      return this.$store.state.books
    }
  },
  head () {
    return {
      title: 'myLibrary - My Books'
    }
  },
  components: {
    BookList
  }
}
</script>
