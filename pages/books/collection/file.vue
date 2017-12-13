<template>
  <div class="file">
    <div class="mb-3" :title="book.file">
      <label class="file-select">
        <span v-if="book.file">{{ book.file | truncate(40) }}</span>
        <span v-else class="add">(click to edit)</span>

        <input type="file" @change="updateFileName">
      </label>
    </div>
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
            this.$toasted.success('File added to book ' + response.data.title)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  input[type=file] {
    display: none;
  }

  .file-select {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      background: #f9f8d0;
    }

    .add {
      color: $medium;

      &:hover {
        color: #9c9b74;
      }
    }
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
