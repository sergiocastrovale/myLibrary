<template>
  <div class="wrapper">
    <div class="inside">
      <form-schema :schema="schema" v-model="book" @submit.stop.prevent="save" class="form-area">
        <div class="actions">
          <nuxt-link to="/books/collection" class="btn hollow">« Back to collection</nuxt-link>
          <button class="btn ok" type="submit">Save changes</button>
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
          this.$toast.success(response.data.title + ' saved!')
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

