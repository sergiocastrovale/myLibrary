<template>
  <ul v-if="books">
    <li v-for="book in books" :key="book.id" class="border-light bg-white p-3 radius-small my-2">
      <img :src="'uploads/books/' + book.googleId + '.jpg'" />

      {{ book.title }}
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    books: Array
  }
}
</script>
