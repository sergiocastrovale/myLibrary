<template>
  <div class="search">
    <form class="bg-lightest" @submit.prevent.stop="search">
      <input type="text" v-model="query" placeholder="Type to search in your collection..."></input>
    </form>
  </div>
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