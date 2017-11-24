<template>
  <div class="wrapper">
    <app-header></app-header>

    <section class="content">
      <div class="columns">
        <app-menu></app-menu>

        <main class="main">
          <nuxt></nuxt>
        </main>

        <app-sidebar></app-sidebar>
      </div>
    </section>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '~/components/Header.vue'
  import AppFooter from '~/components/Footer.vue'
  import AppMenu from '~/components/Menu.vue'
  import AppSidebar from '~/components/Sidebar.vue'

  export default {
    components: {
      AppHeader,
      AppFooter,
      AppMenu,
      AppSidebar
    }
  }
</script>
