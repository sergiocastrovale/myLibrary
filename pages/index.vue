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
  }
}
</script>
