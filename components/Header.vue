<template>
  <header class="d-flex">
    <div>myLibrary</div>

    <ul>
      <li>
        <a href="/api/auth/google">Sign In with Google</a>
      </li>

      <li>
        <a href="/api/auth/logout">Logout</a>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/variables';

  header {
    background: $primary-color;
    color: $primary-color-lightest;
  }
</style>
