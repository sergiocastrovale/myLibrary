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

        <div class="text my-3 py-3 bt-light bb-light fs-small">
          <div>{{ book.description }}</div>

          <div v-if="book.url" class="my-3">
            <i class="fa fa-link" aria-hidden="true"></i>

            <a :href="book.url">
              {{ book.url }}
            </a>
          </div>
        </div>

        <div class="text my-3">
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
          <strong>Notes</strong>

          <div class="mt-1">
            <div v-if="editing">
              <textarea v-model="notes" :placeholder="notesPlaceholder"></textarea>

              <div class="mt-2">
                <button class="btn ok small" @click="saveNotes">Save</button>
                <button class="btn secondary small" @click="cancel">Cancel</button>
              </div>
            </div>
            <div v-else class="edit-in-place" @click="editNotes">
              <span v-if="notes">{{ notes }}</span>
              <span v-else>{{ notesPlaceholder }}</span>

              <i aria-hidden="true" title="Edit notes" class="fa fa-edit fs-small ml-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import axios from 'axios'
  import BookCover from './cover'

  export default {
    props: {
      book: Object,
      meAsOwner: Object
    },
    data: () => ({
      notes: '',
      notesPlaceholder: '(Click to add your private notes on this book)',
      editing: false
    }),
    created () {
      this.notes = this.meAsOwner ? this.meAsOwner.notes : ''
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
      },
      editNotes () {
        this.editing = true
      },
      cancel () {
        this.editing = false
      },
      async saveNotes () {
        let response = await axios.post('/api/book/updateNotes', {
          userId: this.$store.state.auth.user.id,
          bookId: this.book.id,
          notes: this.notes
        })

        if (response.status === 200 && response.data) {
          this.$store.dispatch('books/updateList')
          this.$toast.success('Notes updated!')
          this.editing = false
        }
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
