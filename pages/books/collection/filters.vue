<template>
  <div class="ml-auto">
    <select v-model="selectedOption" @change="triggerOption">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      books: Array
    },
    data: () => ({
      selectedOption: 0,
      options: [
        { value: 0, label: '(No filters selected)' },
        { value: 1, label: 'Show only favorites' },
        { value: 2, label: 'Show only books with PDF' }
      ]
    }),
    methods: {
      triggerOption () {
        if (this.selectedOption === 0) {
          this.$store.dispatch('books/updateList')
          this.$emit('filtered', false)
        } else if (this.selectedOption === 1) {
          this.$store.dispatch('books/filterByFavorites')
          this.$emit('filtered', true)
        } else if (this.selectedOption === 2) {
          this.$store.dispatch('books/filterByPDF')
          this.$emit('filtered', true)
          console.log(this.books)
        }
      }
    }
  }
</script>
