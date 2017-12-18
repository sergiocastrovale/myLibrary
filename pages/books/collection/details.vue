<template>
  <modal :name="modalName" width="60%" height="auto" :scrollable="true">
    <div class="close" @click="close">✖</div>

    <div class="d-flex align-content-stretch p-5">
      <div class="left">
        <book-cover :book="book" size="large" :zoom="false"></book-cover>

        <ul class="fs-small mt-1">
          <li>Language: {{ book.language }}</li>
          <li>Pages: {{ book.pageCount }}</li>
        </ul>
      </div>

      <div class="right">
        <h3>{{ book.title }}</h3>
        <h4>{{ subtitle }}</h4>

        <div class="text my-3 py-3 bt-light bb-light">
          <div>{{ book.description }}</div>

          <div v-if="book.url" class="my-3">
            <i class="fa fa-link" aria-hidden="true"></i>

            <a :href="book.url">
              {{ book.url }}
            </a>
          </div>
        </div>

        <!-- <div v-if="book.notes" class="text my-3">
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
          <strong>Notes</strong>

          <div class="mt-1">
            {{ book.notes }}
          </div>
        </div> -->
      </div>
    </div>
  </modal>
</template>

<script>
  import BookCover from './cover'

  export default {
    props: {
      book: Object
    },
    computed: {
      modalName () {
        return 'book-' + this.book.id + '-details'
      },
      subtitle () {
        const publisher = this.book.publisher
        const date = this.book.publishedDate

        if (publisher && date) {
          return publisher + ', ' + date
        } else if (publisher) {
          return publisher
        } else if (date) {
          return date
        }
      }
    },
    methods: {
      close () {
        this.$modal.hide(this.modalName)
      }
    },
    components: {
      BookCover
    }
  }
</script>

<style lang="scss" scoped>
  .v--modal-box.v--modal {
    position: relative;

    .data {
      overflow: scroll;
    }

    .left {
      margin-right: 2.5rem;
    }

    .right {
      width: 100%;
    }

    .text {
      display: block;
      line-height: 1.5rem;
    }

    label {
      > div {
        margin-top: 0.5rem;
      }
    }

    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }
  }
</style>
