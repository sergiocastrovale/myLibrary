<template>
  <div>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'myLibrary - My Books'
    }
  },
  created () {
    if (this.$store.getters['auth/loggedIn']) {
      this.$router.push({ path: '/books/collection' })
    }
  }
}
</script>
