<template>
  <div class="ml-auto">
    <select v-if="users" v-model="selectedUser" @change="triggerUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.username }}
      </option>
    </select>

    <select v-model="selectedOption" @change="triggerOption">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    props: {
      books: Array
    },
    data: () => ({
      selectedOption: 0,
      selectedUser: 0,
      users: [],
      options: [
        { value: 0, label: '(No filters selected)' },
        { value: 1, label: 'Show only favorites' },
        { value: 2, label: 'Show only books with PDF' }
      ]
    }),
    created () {
      this.fetchUsers()
    },
    methods: {
      triggerOption () {
        if (this.selectedOption === 0) {
          this.$store.dispatch('books/updateList')
          this.$emit('filtered', false)
        } else if (this.selectedOption === 1) {
          this.$store.dispatch('books/filterBy', { type: 'Favorites' })
          this.$emit('filtered', true)
        } else if (this.selectedOption === 2) {
          this.$store.dispatch('books/filterBy', { type: 'PDF' })
          this.$emit('filtered', true)
        }
      },
      async fetchUsers () {
        const empty = [{ id: 0, username: '(No user selected)' }]
        const { data } = await axios.get('/api/users/getAllForSelect/' + this.$store.state.auth.user.id)

        this.users = [...empty, ...data]
      },
      triggerUser () {
        if (this.selectedUser === 0) {
          this.$store.dispatch('books/updateList')
        } else {
          this.$store.dispatch('books/filterBy', { id: this.selectedUser, type: 'User' })
          this.$emit('filtered', true)
        }
      }
    }
  }
</script>
