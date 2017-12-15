<template>
  <div v-if="loggedIn" @click="logout">
    <i class="fa fa-sign-out" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters['auth/loggedIn']
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style>

</style>
