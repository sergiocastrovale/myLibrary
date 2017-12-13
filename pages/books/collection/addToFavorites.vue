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
          const str = response.data.isFavorite ? ' was added to' : ' was removed from'

          this.$store.dispatch('books/updateList')
          this.$toasted.success(response.data.title + str + ' your favorites!')
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
