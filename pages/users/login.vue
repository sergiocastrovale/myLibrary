<template>
  <div>
    <div class="bg-darker">
      <app-header></app-header>
    </div>

    <div class="login-form form-area">
      <h1>Hi there!</h1>
      <h4>You need to login before accessing your collection.</h4>

      <form @submit.prevent="login" class="mt-5">
        <label for="username">
          Username
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
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '~/components/header.vue'
  import AppFooter from '~/components/footer.vue'

  export default {
    layout: 'base',
    data () {
      return {
        error: null,
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        try {
          // This action handles the whole login assigning process
          // and stores both the user and token

          this.$store.dispatch('auth/login', { fields: {
            username: this.username,
            password: this.password
          }})

          // Reset form

          this.reset()

          // Move to the front page

          // this.$router.push({ path: '/' })
        } catch (e) {
          this.error = e.message
        }
      },
      reset () {
        this.username = ''
        this.password = ''
        this.error = null
      }
    },
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    margin: 5rem auto;
    max-width: 30rem;
  }
</style>
