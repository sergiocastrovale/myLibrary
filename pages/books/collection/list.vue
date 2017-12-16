<template>
  <div>
    <table v-if="books && books.length">
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
        <td>
          <book-details :book="book"></book-details>
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
          <book-file :book="book"></book-file>
        </td>

        <td>
          <ul>
            <li v-for="user in book.users" :key="user.id">
              {{ user.username }}
            </li>
          </ul>
        </td>

        <td class="text-center fs-larger">
          <div class="d-flex align-items-center">
            <a>
              <i class="fa fa-eye" aria-hidden="true" title="Details" @click="openDetails(book.id)"></i>
            </a>

            <add-to-favorites :book="book"></add-to-favorites>

            <nuxt-link :to="'/books/edit/' + book.id" exact>
              <i class="fa fa-edit" aria-hidden="true" title="Edit"></i>
            </nuxt-link>

            <remove :book="book"></remove>
          </div>
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
  import AddToFavorites from './addToFavorites'
  import BookFile from './file'
  import BookCover from './cover'
  import Remove from './remove'
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
          { id: 7, label: 'Owners' },
          { id: 8, label: 'Actions', className: 'actions' }
        ],
        sortField: 'title',
        sortDirection: 'asc'
      }
    },
    computed: {
      sortedBooks () {
        console.log(this.books.length)
        return orderBy(this.books, this.sortField, this.sortDirection)
      },
      sortArrow () {
        return ['fa', 'sort', ((this.sortDirection === 'asc') ? 'fa-chevron-up' : 'fa-chevron-down')]
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
      Remove,
      BookCover,
      AddToFavorites
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  .sort {
    font-size: $font-size-small;
    margin-left: 5px;
  }

  .unsorted {
    width: 17px;
    display: inline-block;
  }
</style>