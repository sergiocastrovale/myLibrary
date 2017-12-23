<template>
  <div>
    <table v-if="books !== undefined && books && books.length">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.id" @click="sortBooks(header.field)" :class="header.className">
            <span v-if="header.field" class="d-flex align-items-center">
              {{ header.label }}

              <i v-if="header.field === sortField" :class="sortArrow" aria-hidden="true"></i>
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
        <td :class="['ownership', meAsOwner(book.id) ? 'mine' : '']"></td>

        <td>
          <book-cover :book="book" size="small"></book-cover>
        </td>

        <td>
          {{ book.title }}
          <div v-if="book.subtitle" class="fs-small">{{ book.subtitle }}</div>

          <div v-if="book.isbn10 || book.isbn13" class="fs-small">ISBN: {{ book.isbn13 }}, {{ book.isbn10 }}</div>
        </td>

        <td>
          <span v-for="(author, index) in book.authors" :key="author.id">
            {{ author.name }}<span v-if="index < book.authors.length - 1">, </span>
          </span>
        </td>

        <td>
          <div v-if="book.pageCount">{{ book.pageCount }}</div>
        </td>

        <td>
          <div v-if="book.publisher">{{ book.publisher }}</div>
          <div v-if="book.publishedDate" class="fs-small">Published in {{ book.publishedDate }}</div>
        </td>

        <td>
          <book-file :book="book" :meAsOwner="meAsOwner(book.id)"></book-file>
        </td>

        <td>
          <ul>
            <li v-for="user in book.users" :key="user.id">
              {{ user.username }}
            </li>
          </ul>
        </td>

        <td class="fs-larger">
          <book-actions :book="book" :meAsOwner="meAsOwner(book.id)"></book-actions>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else class="my-5">
      No books found matching your criteria.
    </div>
  </div>
</template>

<script>
  import BookCover from './cover'
  import BookFile from './file'
  import BookActions from './actions'
  import { orderBy } from 'lodash'

  export default {
    props: {
      books: Array
    },
    data () {
      return {
        headers: [
          { id: 0, label: '' },
          { id: 1, label: 'Cover' },
          { id: 2, label: 'Title', field: 'title' },
          { id: 3, label: 'Authors', field: 'authors' },
          { id: 5, label: 'Pages', field: 'pageCount' },
          { id: 6, label: 'Publisher', field: 'publisher' },
          { id: 7, label: 'File' },
          { id: 8, label: 'Owners' },
          { id: 9, label: 'Actions', className: 'actions' }
        ],
        sortField: 'title',
        sortDirection: 'asc'
      }
    },
    computed: {
      sortedBooks () {
        return orderBy(this.books, this.sortField, this.sortDirection)
      },
      sortArrow () {
        return ['fa', 'sort', ((this.sortDirection === 'asc') ? 'fa-chevron-up' : 'fa-chevron-down')]
      }
    },
    methods: {
      meAsOwner (id) {
        const book = this.books.find(book => book.id === id)
        return book.users.find(user => user.id === this.$store.state.auth.user.id)
      },
      sortBooks (field) {
        if (this.sortField === field) {
          this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc'
        } else {
          this.sortField = field
          this.sortDirection = 'asc'
        }
      }
    },
    components: {
      BookCover,
      BookFile,
      BookActions
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  table th:first-child,
  table td.ownership {
    padding: 0;
    min-width: 5px;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    background: transparent;

    &.mine {
      border-color: $green;
      background: $green;
    }
  }

  table th:last-child {
    text-align: center;
  }

  .sort {
    font-size: $font-size-small;
    margin-left: 5px;
  }

  .unsorted {
    width: 17px;
    display: inline-block;
  }
</style>