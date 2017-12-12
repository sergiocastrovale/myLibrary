<template>
  <ul class="pagination my-3">
    <li v-for="page in pages" :key="page" :class="{ active: ((page+1) === currentPage) }">
      <nuxt-link :to="'/books/collection/' + (page+1)">
        {{ (page+1) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {
    computed: {
      pages () {
        const n = Math.ceil(this.$store.state.books.count / this.$store.state.books.size)
        return (n > 1) ? [...Array(n).keys()] : []
      },
      currentPage () {
        return parseInt(this.$route.params.page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables';

  .pagination {
    > li {
      display: inline-block;
      border: 1px solid $medium;
      margin-right: 1px;
      background: $lightest;

      > a {
        display: block;
        padding: 0 10px;
        line-height: 28px;
      }

      &.active {
        border-color: $primary-color-dark;
        background: $primary-color-dark;

        > a {
          color: $lightest;
        }
      }
    }
  }
</style>
