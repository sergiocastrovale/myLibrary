<template>
  <div class="top">
    <search @reset="reset" @filtered="filtered"></search>
    <user></user>
  </div>
</template>

<script>
  import Search from './search'
  import User from '@/components/user'

  export default {
    methods: {
      reset () {
        this.$emit('reset')
      },
      filtered (filtered) {
        this.$emit('filtered', filtered)
      }
    },
    components: {
      Search,
      User
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  .top {
    height: 12rem;
    display: flex;
    align-items: center;
    background: $lightest;
    border-bottom: 1px solid $light;
  }
</style>
