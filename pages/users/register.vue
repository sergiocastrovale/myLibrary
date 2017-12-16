<template>
  <div class="wrapper">
    <div class="inside">
      <form-schema :schema="schema" v-model="user" @submit.stop.prevent="save" class="form-area">
        <div class="actions">
          <nuxt-link to="/users/login" class="btn hollow">« Back to login</nuxt-link>
          <button class="btn ok" type="submit">Create account</button>
        </div>
      </form-schema>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import FormSchema from 'vue-json-schema'
  import schema from '@/schemas/user.json'

  FormSchema.setComponent('title', 'h2')
  FormSchema.setComponent('description', 'h4')

  export default {
    layout: 'base',
    data: () => ({
      schema: schema,
      user: {}
    }),
    methods: {
      async save () {
        if (this.user.username && this.user.password) {
          let response = await axios.post('/api/auth/register', {
            username: this.user.username,
            password: this.user.password
          })

          if (response.status === 200 && response.data) {
            this.$toast.success(response.data.username + ' added!')
            this.$router.push({ path: '/users/login' })
          } else {
            this.$toast.error(response.data)
          }
        } else {
          this.$toast.error('Please fill in the required fields!')
        }
      }
    },
    components: {
      FormSchema
    }
  }
</script>

