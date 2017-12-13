<template>
  <modal :name="'book-' + book.id + '-details'">
    hello, world!
  </modal>
</template>

<script>
  export default {
    props: {
      book: Object
    }
  }
</script>

<style>

</style>
