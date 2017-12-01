<template>
  <div class="list">
    <search></search>

    <table v-if="books">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.id">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="book in books" :key="book.id" class="border-light bg-white p-3 radius-small my-2">
        <td>
          <img class="cover" :src="'/uploads/books/' + book.googleId + '.jpg'" />
        </td>

        <td>
          {{ book.title }}
          <div class="fs-small">{{ book.subtitle }}</div>
          <div class="fs-small">ISBN-13: {{ book.isbn13 }}</div>
        </td>

        <td>
          <span v-for="(author, index) in book.authors" :key="author.id">
            {{ author.name }}<span v-if="index < book.authors.length - 1">, </span>
          </span>
        </td>
        <td>{{ book.pageCount }}</td>

        <td>
          {{ book.publisher }}
          <div class="fs-small">Published in {{ book.publishedDate }}</div>
        </td>

        <td>
          <book-file :book="book"></book-file>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Search from './search'
  import BookFile from './file'

  export default {
    props: {
      books: Array
    },
    data () {
      return {
        headers: [
          { id: 0, label: 'Cover' },
          { id: 1, label: 'Title' },
          { id: 2, label: 'Authors' },
          { id: 3, label: 'Pages' },
          { id: 5, label: 'Publisher' },
          { id: 6, label: 'File' }
        ]
      }
    },
    components: {
      Search,
      BookFile
    }
  }
</script>

<style lang="scss" scoped>
  .cover {
    height: 50px;
    width: auto;
  }
</style>
