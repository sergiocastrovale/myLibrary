<template>
  <div class="wrapper">
    <div class="inside">
      <div class="form-area">
        <form @submit.prevent="save" class="mt-5">
          <label for="email">
            Email
            <input type="email" v-model="user.email" name="email">
          </label>

          <label for="email">
            Path
            <input type="text" v-model="user.path" name="path">
          </label>

          <div class="actions">
            <button type="submit" class="btn ok">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    layout: 'default',
    data: () => ({
      user: {}
    }),
    created () {
      const user = this.$store.state.auth.user
      this.user.email = user.email
      this.user.path = user.path
    },
    methods: {
      async save () {
        try {
          let response = await axios.post('/api/user/update', {
            id: this.$store.state.auth.user.id,
            data: this.user
          })

          if (response.status === 200) {
            this.$toast.success('Profile updated successfully!')
          } else {
            this.$toast.error('An unspecified error occurred. Please try again.')
          }
        } catch (e) {
          this.$toast.error(e.response.data.message)
        }
      }
    }
  }
</script>

