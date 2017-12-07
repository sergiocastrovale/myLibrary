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
    data: () => ({
      loading: false,
      schema: schema,
      book: {}
    }),
    methods: {
      async add () {
        this.loading = true
        console.log(this.book)
        axios.post('/api/book/add', this.book)
          .then((response) => {
            console.log(response)
            this.$store.dispatch('updateBooks')
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