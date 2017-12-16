<template>
  <section class="content">
    <app-menu></app-menu>

    <main class="main">
      <nuxt></nuxt>
    </main>
  </section>
</template>

<script>
  import AppMenu from '~/components/Menu.vue'

  export default {
    middleware: 'auth',
    components: {
      AppMenu
    }
  }
</script>
