<template>
  <div class="cover">
    <img v-if="book.googleId" :src="'/uploads/books/' + book.googleId + '.jpg'" :class="[size, (zoom ? 'zoom' : '')]">
    <div v-else class="blank bg-light border-medium"></div>
  </div>
</template>

<script>
  export default {
    props: {
      book: Object,
      size: String,
      zoom: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cover {
    min-height: 50px;
    position: relative;

    > .blank {
      height: 50px;
      width: 34px;
    }

    > img {
      width: auto;

      &.small {
        height: 50px;
      }

      &.medium {
        height: 100px;
      }

      &.large {
        height: auto;
      }

      &.zoom {
        &:hover {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          height: auto;
          width: auto;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25)
        }
      }
    }
  }
</style>
