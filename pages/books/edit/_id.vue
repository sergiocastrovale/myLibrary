<template>
  <div class="wrapper">
    <div class="inside">
      <form-schema :schema="schema" v-model="book" @submit.stop.prevent="save" class="form-area">
        <button type="submit">Add book</button>
      </form-schema>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import FormSchema from 'vue-json-schema'
  import schema from '@/schemas/book.json'

  export default {
    async asyncData ({ params }) {
      let book = null
      let response = await axios.get('/api/books/edit/:id', { params: {
        id: params.id
      }})

      if (response.status === 200 && response.data) {
        book = response.data
      }

      return { book: book }
    },
    data: () => ({
      loading: false,
      schema: schema
    }),
    methods: {
      async save () {
        let response = await axios.post('/api/book/edit', {
          book: this.book
        })

        if (response.status === 200 && response.data) {
          this.$store.dispatch('books/updateList')
          this.loading = false
          this.$toast.success(response.data.message)
        } else {
          this.$toast.error(response.data)
          this.loading = false
        }
      }
    },
    components: {
      FormSchema
    }
  }
</script>

