<template>
  <div class="d-flex align-items-center">
    <a>
      <i class="fa fa-eye" aria-hidden="true" title="Details" @click="openDetails(book.id)"></i>
    </a>

    <toggle-favorite :book="book" :meAsOwner="meAsOwner"></toggle-favorite>

    <nuxt-link :to="'/books/edit/' + book.id" exact>
      <i class="fa fa-edit" aria-hidden="true" title="Edit"></i>
    </nuxt-link>

    <remove :book="book" :meAsOwner="meAsOwner"></remove>
  </div>
</template>

<script>
  import BookFile from './file'
  import toggleFavorite from './toggleFavorite'
  import Remove from './remove'
  import BookDetails from './details'

  export default {
    props: {
      book: Object
    },
    computed: {
      meAsOwner () {
        return this.book.users.find(user => user.id === this.$store.state.auth.user.id)
      }
    },
    components: {
      BookFile,
      BookDetails,
      Remove,
      toggleFavorite
    }
  }
</script>