<template>
  <div class="actions">
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
  import toggleFavorite from './toggleFavorite'
  import Remove from './remove'
  import BookDetails from './details'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    components: {
      BookDetails,
      Remove,
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
