<template>
  <div class="base">
    <div class="bg-darker">
      <app-header></app-header>
    </div>

    <nuxt></nuxt>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '~/components/header.vue'
  import AppFooter from '~/components/footer.vue'

  export default {
    middleware: 'no-auth',
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="scss">
  .base {
    height: 100vh;
  }
</style>
