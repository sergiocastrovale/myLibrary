<template>
  <table v-if="books && books.length">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.id" @click="sortBooks(header.field)" :class="header.className">
          <span v-if="header.field">
            {{ header.label }}

            <i v-if="header.field === sortField" :class="['fa', ((sortDirection === 'asc') ? 'fa-chevron-up' : 'fa-chevron-down')]" aria-hidden="true"></i>
            <div v-else class="unsorted"></div>
          </span>
          <span v-else>
            {{ header.label }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="book in sortedBooks" :key="book.id" class="border-light bg-white p-3 radius-small my-2">
      <td>
        <book-details :book="book"></book-details>
        <book-cover :book="book" size="small"></book-cover>
      </td>

      <td>
        {{ book.title }}
        <div class="fs-small">{{ book.subtitle }}</div>
        <div class="fs-small">ISBN: {{ book.isbn13 }}, {{ book.isbn10 }}</div>
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

      <td class="text-center fs-larger">
        <nuxt-link :to="'/books/edit/' + book.id" exact>
          <i class="fa fa-edit" aria-hidden="true" title="Edit"></i>
        </nuxt-link>

        <a>
          <i class="fa fa-eye" aria-hidden="true" title="Details" @click="openDetails(book.id)"></i>
        </a>

        <add-to-favorites :book="book"></add-to-favorites>
      </td>
    </tr>
    </tbody>
  </table>
  <div v-else class="my-5">
    No books found matching your criteria.
  </div>
</template>

<script>
  import AddToFavorites from './addToFavorites'
  import BookFile from './file'
  import BookCover from './cover'
  import BookDetails from './details'
  import { orderBy } from 'lodash'

  export default {
    props: {
      books: Array
    },
    data () {
      return {
        headers: [
          { id: 0, label: 'Cover' },
          { id: 1, label: 'Title', field: 'title' },
          { id: 2, label: 'Authors', field: 'authors' },
          { id: 3, label: 'Pages', field: 'pageCount' },
          { id: 5, label: 'Publisher', field: 'publisher' },
          { id: 6, label: 'File' },
          { id: 7, label: 'Actions', className: 'actions' }
        ],
        sortField: 'title',
        sortDirection: 'asc'
      }
    },
    computed: {
      sortedBooks () {
        console.log(this.books.length)
        return orderBy(this.books, this.sortField, this.sortDirection)
      }
    },
    methods: {
      sortBooks (field) {
        if (this.sortField === field) {
          this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc'
        } else {
          this.sortField = field
          this.sortDirection = 'asc'
        }
      },
      openDetails (id) {
        this.$modal.show('book-' + id + '-details')
      }
    },
    components: {
      BookFile,
      BookDetails,
      BookCover,
      AddToFavorites
    }
  }
</script>

<style lang="scss" scoped>
  .unsorted {
    width: 17px;
    display: inline-block;
  }
</style>