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
          <input type="text" v-model="formUsername" name="username">
        </label>

        <label for="password">
          Password
          <input type="password" v-model="formPassword" name="password">
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
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
      async login () {
        try {
          await this.$store.dispatch('auth/login', { fields: {
            username: this.formUsername,
            password: this.formPassword
          }})

          console.log(this.$store.state.auth)

          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
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
