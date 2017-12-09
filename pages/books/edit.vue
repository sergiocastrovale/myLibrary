<template>
  <div>
    <form-schema :schema="schema" v-model="book" @submit="add">
      <button type="submit">Add book</button>
    </form-schema>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import FormSchema from 'vue-json-schema'
  import schema from '@/schemas/book.json'

  export default {
    fetch ({ store, params }) {
      return axios.get('/api/book/:id', { params: { id: params.id } })
        .then((res) => {
          this.book = res.data
        })
    },
    data: () => ({
      loading: false,
      schema: schema,
      book: {}
    }),
    methods: {
      async add () {
        this.loading = true

        axios.post('/api/book/add', this.book)
          .then((response) => {
            this.$store.dispatch('books/updateList')
            this.loading = false
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
          })
      }
    },
    components: {
      FormSchema
    }
  }
</script>

