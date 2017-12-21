<template>
  <div class="login-form form-area">
    <h1>Hi there!</h1>
    <h4>You need to login before accessing your collection.</h4>

    <form @submit.prevent="login" class="mt-5">
      <label for="username">
        Email or username
        <input type="text" v-model="username" name="username">
      </label>

      <label for="password">
        Password
        <input type="password" v-model="password" name="password">
      </label>

      <div class="actions">
        <button type="submit" class="btn ok">Log in to your collection</button>
      </div>
    </form>

    <nuxt-link to="/users/register">Register</nuxt-link>
  </div>
</template>

<script>
  export default {
    layout: 'base',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login () {
        // This action handles the whole login assigning process
        // and stores both the user and token

        try {
          await this.$store.dispatch('auth/login', { fields: {
            username: this.username,
            password: this.password
          }})
          // Did we login successfully? If so, move on to the list
          // else show what went wrong

          if (this.$store.getters['auth/loggedIn']) {
            this.$router.push({ path: '/books/collection' })
          }
        } catch (e) {
          this.$toast.error(e.response.data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    margin: 5rem auto;
    max-width: 30rem;
  }
</style>
