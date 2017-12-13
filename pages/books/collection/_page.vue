<template>
  <div class="wrapper">
    <search @reset="reset" @filtered="filtered"></search>

    <div class="inside">
      <div class="d-flex fs-small color-dark mb-2">
        <div>
          <span v-if="hasFilters">
            Found {{ total }} results
          </span>
          <span v-else>
            Showing {{ size }} / {{ total }} results
          </span>
        </div>

        <filters :books="books" @filtered="filtered"></filters>
      </div>

      <list :books="books"></list>

      <pagination v-if="!hasFilters"></pagination>
    </div>
  </div>
</template>

<script>
  import List from './list'
  import Search from './search'
  import Filters from './filters'
  import Pagination from '@/components/pagination'

  export default {
    async fetch ({ store, params }) {
      await store.dispatch('books/updateList', params.page)
    },
    data: () => ({
      hasFilters: false
    }),
    computed: {
      books () {
        return this.$store.state.books.list
      },
      size () {
        return this.$store.state.books.size
      },
      total () {
        return this.$store.state.books.count
      },
      listType () {
        return this.hasFilters ? 'searchResults' : 'list'
      }
    },
    methods: {
      reset () {
        this.sortField = 'title'
        this.sortDirection = 'asc'
        this.$store.dispatch('books/updateList')
      },
      filtered (value) {
        this.hasFilters = value
      }
    },
    components: {
      Search,
      List,
      Filters,
      Pagination
    }
  }
</script>
