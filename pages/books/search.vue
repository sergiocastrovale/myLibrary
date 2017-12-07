<template>
  <div class="search">
    <form class="bg-lightest" @submit.prevent.stop="search">
      <input type="text" v-model="query" placeholder="Type to search in your collection..."></input>
      <div @click="reset">Reset</div>
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
        if (this.query.length > 2) {
          this.$store.dispatch('searchInCollection', this.query)
        }
      },
      reset () {
        this.query = ''
        this.$emit('reset')
      }
    }
  }
</script>