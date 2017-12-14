<template>
  <div class="wrapper">
    <div class="inside">
      <form-schema :schema="schema" v-model="book" @submit.stop.prevent="add" class="form-area">
        <div class="actions">
          <button class="btn ok" type="submit">Add book</button>
        </div>
      </form-schema>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import FormSchema from 'vue-json-schema'
  import schema from '@/schemas/book.json'

  FormSchema.setComponent('title', 'h2')
  FormSchema.setComponent('description', 'h4')

  export default {
    data: () => ({
      loading: false,
      schema: schema,
      book: {}
    }),
    methods: {
      async add () {
        let response = await axios.post('/api/book/add', this.book)

        if (response.status === 200 && response.data) {
          this.$store.dispatch('books/updateList')

          this.loading = false

          this.$toast.success('Book saved!')
          this.$router.push('/books/collection')
        } else {
          console.log(response)
          this.loading = false
        }
      }
    },
    components: {
      FormSchema
    }
  }
</script>