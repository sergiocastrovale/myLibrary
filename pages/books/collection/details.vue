<template>
  <div>
      <details-modal :book="book" :meAsOwner="meAsOwner"></details-modal>

      <a>
        <i class="fa fa-eye" aria-hidden="true" title="Details" @click="openDetails(book.id)"></i>
      </a>
    </div>
</template>

<script>
  import DetailsModal from './detailsModal'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    methods: {
      openDetails (id) {
        this.$modal.show('book-' + id + '-details')
      }
    },
    components: {
      DetailsModal
    }
  }
</script>