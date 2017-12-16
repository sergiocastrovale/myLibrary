<template>
  <div>
    <nuxt-link to="/books/collection">
      Collection
    </nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: 'no-auth',
  head () {
    return {
      title: 'myLibrary - My Books'
    }
  },
  created () {
    if (this.$store.getters['auth/loggedIn']) {
      console.log('logged in with', this.$store.state.auth.user)
    }
  }
}
</script>
