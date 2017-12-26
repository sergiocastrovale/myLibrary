<template>
  <div class="actions">
    <book-details :book="book" :meAsOwner="meAsOwner"></book-details>

    <toggle-favorite :book="book" :meAsOwner="meAsOwner"></toggle-favorite>

    <nuxt-link :to="'/books/edit/' + book.id" exact>
      <i class="fa fa-edit" aria-hidden="true" title="Edit"></i>
    </nuxt-link>

    <download :book="book" :meAsOwner="meAsOwner"></download>

    <remove :book="book" :meAsOwner="meAsOwner"></remove>
  </div>
</template>

<script>
  import toggleFavorite from './toggleFavorite'
  import BookDetails from './details'
  import Download from './download'
  import Remove from './remove'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    components: {
      Remove,
      Download,
      BookDetails,
      toggleFavorite
    }
  }
</script>

<style lang="scss" scoped>
  table td .actions {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
