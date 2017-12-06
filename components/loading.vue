<template>
  <div class="loading bg-orange" v-if="loading"></div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 5px;
    width: 100%;
  }
</style>