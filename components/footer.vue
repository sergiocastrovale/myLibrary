<template>
  <footer class="text-center fs-small">
      Developed with <span>❤</span>️ by <a href="http://sergiocastro.me">Sérgio Castro</a> using Nuxt, Express and Objection.
  </footer>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/variables';

  footer {
    width: 100%;
    position: absolute;
    bottom: 1rem;
    color: $dark;

    > a {
      color: $dark;
      text-decoration: underline;
    }
  }
</style>
