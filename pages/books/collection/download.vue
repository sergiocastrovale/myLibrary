<template>
  <div v-if="hasSetPath" @click="downloadFile">
      <i class="fa fa-download" aria-hidden="true"></i>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    computed: {
      hasSetPath () {
        return (this.meAsOwner && this.$store.state.auth.user.path !== null && this.$store.state.auth.user.path.length > 0)
      },
      fullPath () {
        return this.$store.state.auth.user.path + '/' + this.meAsOwner.file
      }
    },
    methods: {
      downloadFile () {
        if (this.hasSetPath) {
          axios.get('/api/books/download', { params: {
            userId: this.meAsOwner.id,
            bookId: this.book.id
          }})
        }
      }
    }
  }
</script>