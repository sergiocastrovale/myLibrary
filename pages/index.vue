<template>
  <section class="container">
    <div v-if="loading" class="loading">
      Loading, please wait ...
    </div>

    <div class="d-flex">
      <div class="books">
        <Table :columns="bookColumns" :data="books" stripe></Table>
        <Page :total="5" :current="1" @on-change="changePage"></Page>
      </div>

      <div class="search">
        <form @submit.prevent.stop="search">
          <Input v-model="query" placeholder="Enter something..."></Input>
        </form>

        <ul v-if="results" class="results">
          <li v-for="(book, index) in results" :key="index">
            <img :src="book.volumeInfo.imageLinks.smallThumbnail">

            <div class="details">
              {{ book.volumeInfo.title }}
            </div>

            <div class="add" @click="create(book)">+</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      loading: false,
      fields: [
        { label: 'Title', value: 'title' },
        { label: 'ISBN', value: 'isbn' }
      ],
      query: 'fahrenheit',
      searchResults: null,
      bookColumns: [
        { title: 'ID', key: 'googleId', sortable: true },
        { title: 'Title', key: 'title', sortable: true },
        { title: 'Publisher', key: 'publisher', sortable: true },
        { title: 'Page no.', key: 'pageCount' },
        {
          title: 'Actions',
          key: 'actions',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', size: 'small' },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: { type: 'error', size: 'small' },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  async fetch ({ store }) {
    console.log('on fetch')
    await store.dispatch('updateBooks')
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    results () {
      return this.searchResults ? this.searchResults.items : null
    }
  },
  methods: {
    async search () {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=7&orderBy=relevance&q=' + this.query)

      this.loading = true

      if (res.data !== undefined) {
        this.searchResults = res.data
        this.loading = false
      }
    },
    async create (book) {
      this.loading = true

      axios.post('/api/book/create', book)
        .then((response) => {
          this.$store.dispatch('updateBooks')
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    changePage () {

    },
    show () {

    },
    remove () {

    }
  },
  head () {
    return {
      title: 'Books'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-between;
  }

  .books {
    width: 76.5vw;
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .search {
    width: 19vw;
    margin: 0 1.5vw;
    padding-top: 1.5rem;

    > form {
      margin-bottom: 2rem;
    }

    .results {
      > li {
        display: flex;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #ddd;

        > img {
          margin-right: 5px;
          width: 40px;
          align-self: center;
        }

        .details {
          flex: 1;
        }

        .add {
          width: 18px;
          height: 18px;
          align-self: flex-start;
          border-radius: 50%;
          background: #0a0;
          color: #ddd;
          padding: 0.5rem;
        }
      }
    }
  }
</style>
