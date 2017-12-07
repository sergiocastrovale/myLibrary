import Vuex from 'vuex'
import axios from './../plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      books: [],
      query: '',
      page: 1,
      limit: 5,
      count: 0,
      selectedBook: null
    },
    actions: {
      async updateBooks ({ state, commit }) {
        let response = await axios.post('/api/books/getAll', {
          limit: state.limit,
          page: state.page
        })

        if (response.status === 200 && response.data) {
          commit('setCount', response.data.total)
          commit('updateBooks', response.data.results)
        }
      },
      async searchInCollection ({ state, commit }, query) {
        let response = await axios.get('/api/books/search/:query', { params: { query: query } })

        if (response.status === 200 && response.data) {
          commit('setQuery', query)
          commit('setCount', response.data.length)
          commit('updateBooks', response.data)
        }
      }
    },
    mutations: {
      setQuery: (state, query) => {
        state.query = query
      },
      setCount: (state, count) => {
        state.count = count
      },
      updateBooks: (state, books) => {
        state.books = books
      }
    }
  })
}

export default createStore
