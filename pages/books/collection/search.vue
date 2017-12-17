<template>
  <div class="search">
    <form class="bg-lightest" @submit.prevent.stop="">
      <i class="fa fa-search" aria-hidden="true"></i>
      <input type="text" v-model="query" placeholder="Type to search in your collection..." @keyup="search"></input>
      <div @click="reset">Reset</div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: ''
      }
    },
    created () {
      this.query = this.$store.state.books.query
    },
    methods: {
      async search () {
        const length = this.query.length

        if (length > 2) {
          this.$emit('filtered', true)
          this.$store.dispatch('books/updateQuery', this.query)
          this.$store.dispatch('books/searchInCollection', this.query)

          this.$router.push({ path: '/books/collection' })
        } else if (length === 0) {
          this.reset()
        }
      },
      reset () {
        this.query = ''
        this.$store.dispatch('books/updateQuery', this.query)
        this.$emit('filtered', false)
        this.$emit('reset')

        this.$router.push({ path: '/books/collection' })
      }
    }
  }
</script>