<template>
  <div class="menu bg-primary-light">
    <app-header></app-header>

    <ul>
      <nuxt-link tag="li" to="/"><a>Library</a></nuxt-link>
      <nuxt-link tag="li" to="/books/create"><a>Add books</a></nuxt-link>
    </ul>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from '~/components/Footer.vue'
  import AppHeader from '~/components/Header.vue'

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>