import Vuex from 'vuex'
import axios from './../plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      books: [],
      query: '',
      page: 1,
      limit: 5,
      selectedBook: null
    },
    actions: {
      async updateBooks ({ state, commit }) {
        let response = await axios.post('/api/books/getAll', {
          limit: state.limit,
          page: state.page
        })

        if (response.status === 200 && response.data) {
          commit('updateBooks', response.data)
        }
      },
      async searchInCollection ({ state, commit }, query) {
        let response = await axios.get('/api/books/search/:query', { params: { query: query } })

        if (response.status === 200 && response.data) {
          commit('setQuery', query)
          console.log('Updating books with ', response.data)
          commit('updateBooks', response.data)
        }
      }
    },
    mutations: {
      setQuery: (state, query) => {
        state.query = query
      },
      updateBooks: (state, books) => {
        state.books = books
      }
    }
  })
}

export default createStore
