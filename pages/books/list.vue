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
        </td>

        <td>{{ book.authors }}</td>
        <td>{{ book.pageCount }}</td>
        <td>{{ book.isbn13 }}</td>

        <td>
          {{ book.publisher }}
          <div class="fs-small">Published in {{ book.publishedDate }}</div>
        </td>

        <td>{{ book.collection }}</td>

        <td>Download</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Search from './search'

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
          { id: 4, label: 'ISBN-13' },
          { id: 5, label: 'Publisher' },
          { id: 6, label: 'Collection' },
          { id: 7, label: 'Actions' }
        ]
      }
    },
    components: {
      Search
    }
  }
</script>

<style lang="scss" scoped>
  .cover {
    height: 50px;
    width: auto;
  }
</style>
