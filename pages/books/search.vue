<template>
  <form class="search mb-4" @submit.prevent.stop="search">
    <input type="text" v-model="query" placeholder="Search in your collection..."></input>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        query: ''
      }
    },
    methods: {
      async search () {

      }
    }
  }
</script>