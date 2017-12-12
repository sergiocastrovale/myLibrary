<template>
  <a @click="toggleFavorite(book.id)">
    <i :class="['fa', 'fa-star', book.isFavorite ? ' favorite' : '']" aria-hidden="true" title="Add to favorites"></i>
  </a>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      book: Object
    },
    methods: {
      async toggleFavorite (id) {
        let response = await axios.post('/api/book/toggleFavorite', {
          id: id
        })

        if (response.status === 200 && response.data) {
          this.$store.dispatch('books/updateList')
          console.log('Updated book!', response.data)
        } else {
          console.log('Error', response)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  .favorite {
    color: $yellow
  }
</style>
