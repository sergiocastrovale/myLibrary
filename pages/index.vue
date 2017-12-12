<template>
  <div>
    <a href="/books/collection">Collection</a>

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
