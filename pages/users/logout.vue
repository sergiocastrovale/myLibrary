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
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
