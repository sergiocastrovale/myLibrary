<template>
  <modal :name="'book-' + book.id + '-details'" :width="'60%'">
    <div class="d-flex p-5">
      <div class="mr-5">
        <book-cover :book="book" size="large" :zoom="false"></book-cover>
      </div>

      <div>
        <h3>{{ book.title }}</h3>
        <h4>{{ book.publisher }}</h4>

        <label>
          Language:
          <div>{{ book.language }}</div>
        </label>

        <label>
          More info:
          <div>
            <a :href="book.url">
              {{ book.url }}
            </a>
          </div>
        </label>
      </div>
    </div>
  </modal>
</template>

<script>
  import BookCover from './cover'

  export default {
    props: {
      book: Object
    },
    components: {
      BookCover
    }
  }
</script>

<style>

</style>
