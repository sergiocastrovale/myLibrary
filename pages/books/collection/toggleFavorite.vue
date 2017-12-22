<template>
  <a v-if="meAsOwner" @click="toggleFavorite(book.id)">
    <i :class="['fa', 'fa-star', isFavorite ? ' favorite' : '']" aria-hidden="true" title="Add to favorites"></i>
  </a>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    computed: {
      isFavorite () {
        return this.meAsOwner ? this.meAsOwner.isFavorite : false
      }
    },
    methods: {
      async toggleFavorite (id) {
        try {
          await axios.post('/api/book/toggleFavorite', {
            bookId: id,
            userId: this.$store.state.auth.user.id
          })

          this.$store.dispatch('books/updateList')
        } catch (e) {
          console.log(e.message)
          this.$toasted.error('Something happened while trying to add your book to favorites :( Please try again!')
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
