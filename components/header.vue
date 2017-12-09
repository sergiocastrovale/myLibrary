<template>
  <header>
    <div class="p-3 mb-4">
      <img src="../assets/img/logo.png" alt="myLibrary">

    <ul>
      <li>
        <a @click="login">Login</a>
      </li>

      <li>
        <a href="/api/auth/logout">Logout</a>
      </li>
    </ul>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      login () {
        this.$store.dispatch('login', {
          fields: {
            username: 'your_username',
            password: 'your_password'
          }
        })
      },
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>

</style>
