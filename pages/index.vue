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
        <a href="/api/auth/logout">Logout</a>
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
  }
}
</script>
