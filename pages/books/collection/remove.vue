<template>
  <div v-if="meAsOwner">
    <modal :name="modalName" width="40%" height="auto" :scrollable="true">
      <div class="p-5">
        <h3>
          Are you sure you want to remove "{{ book.title }}" from your collection?
        </h3>

        <div class="d-flex mt-5">
          <div class="btn flex-grow secondary close" @click="close">No</div>
          <div class="btn flex-grow no" @click="remove">Yes, remove</div>
        </div>
      </div>
    </modal>

    <a @click="open">
      <i class="fa fa-times" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    computed: {
      modalName () {
        return 'book-' + this.book.id + '-remove'
      }
    },
    methods: {
      open () {
        this.$modal.show(this.modalName)
      },
      close () {
        this.$modal.hide(this.modalName)
      },
      async remove () {
        try {
          let response = await axios.post('/api/book/remove', {
            bookId: this.book.id,
            userId: this.$store.state.auth.user.id
          })

          if (response.status === 200) {
            this.$store.dispatch('books/updateList')
            this.$modal.hide(this.modalName)
            this.$toast.success('Book removed from your library!')
          }
        } catch (e) {
          console.log(e.message)
          this.$modal.hide(this.modalName)
          this.$toast.error('Something happened while trying to remove your book :( Please try again!')
        }
      }
    }
  }
</script>