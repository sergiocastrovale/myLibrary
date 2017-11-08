<template>
  <div>
    <my-header></my-header>
    <nuxt/>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from '~/components/Header.vue'
  import MyFooter from '~/components/Footer.vue'

  export default {
    components: {
      MyFooter,
      MyHeader
    }
  }
</script>
