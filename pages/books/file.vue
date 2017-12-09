<template>
  <div class="file">
    <div class="mb-3" :title="book.file">
        <span v-if="book.file">{{ book.file | truncate(40) }}</span>
        <span v-else>-</span>
    </div>

    <label class="file-select">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      <input type="file" @change="updateFileName">
    </label>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      book: Object
    },
    methods: {
      async updateFileName (e) {
        const files = e.target.files || e.dataTransfer.files
        const id = this.book.id

        if (files.length) {
          let response = await axios.post('/api/book/updateFile', {
            id: id,
            file: files[0].name
          })

          if (response.status === 200 && response.data) {
            this.$store.dispatch('books/updateList')
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  input[type=file] {
    display: none;
  }

  .button {
    padding: 1rem;
    color: white;
    background-color: #2EA169;
    border-radius: .3rem;
    text-align: center;
    font-weight: bold;
  }
</style>
