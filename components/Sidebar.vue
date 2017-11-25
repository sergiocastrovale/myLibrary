<template>
  <div class="sidebar">
    <ul class="tab-headers">
      <li v-for="tab in tabs" :key="tab.id" @click="switchTab(tab.id)" class="d-inline-block p-2 border-light mb-3 mr-2 radius-small">
        {{ tab.label }}
      </li>
    </ul>

    <div class="tab-content">
      <component :is="selectedComponent"></component>
    </div>
  </div>
</template>

<script>
import Search from '../pages/books/search'
import Sort from '../pages/books/sort'

export default {
  data () {
    return {
      tabs: [
        { id: 1, label: 'Search' },
        { id: 2, label: 'Sort' }
      ],
      selectedComponent: 'search'
    }
  },
  methods: {
    switchTab (tab) {
      switch (tab) {
        case 1:
          this.selectedComponent = 'search'
          break
        default:
          this.selectedComponent = 'sort'
          break
      }
    }
  },
  components: {
    Search,
    Sort
  }
}
</script>

