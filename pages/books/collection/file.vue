<template>
  <div v-if="meAsOwner" class="file">
    <div class="mb-3" :title="meAsOwner.file">
      <label class="file-select">
        <span v-if="meAsOwner.file">{{ meAsOwner.file | truncate(40) }}</span>
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
      book: Object,
      meAsOwner: Object
    },
    methods: {
      async updateFileName (e) {
        const files = e.target.files || e.dataTransfer.files
        const id = this.book.id

        if (files.length) {
          let response = await axios.post('/api/book/updateFile', {
            userId: this.meAsOwner.id,
            bookId: id,
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
