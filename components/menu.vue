<template>
  <div class="menu">
    <app-header></app-header>

    <ul>
      <nuxt-link tag="li" to="/books/collection">
        <a><i class="fa fa-book" aria-hidden="true"></i> <span>Library</span></a>
      </nuxt-link>

      <nuxt-link tag="li" to="/books/create" exact>
        <a><i class="fa fa-plus-square" aria-hidden="true"></i> <span>Add books</span></a>
      </nuxt-link>
    </ul>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from './footer.vue'
  import AppHeader from './header.vue'

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="scss" scoped>
  a > span {
    display: inline-block;
    margin-left: 8px;
  }
</style>
