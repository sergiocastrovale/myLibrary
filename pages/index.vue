<template>
  <div>
    <nuxt-link to="/books/collection">Collection</nuxt-link>

    <ul>
      <li>
        <a href="/api/auth/google">Sign In with Google</a>
      </li>
      <li>
        <a href="/users/login">Login</a>
      </li>

      <li>
        <div @click="logout">Logout</div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'myLibrary - My Books'
    }
  },
  computed: {
    loggedIn () {
      console.log(this.$store.getters['auth/loggedIn'])
      return this.$store.getters['auth/loggedIn']
    }
  },
  methods: {
    async logout () {
      console.log('logging out')
      try {
        await this.$store.dispatch('auth/logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
