import Vuex from 'vuex'
import axios from './../plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      books: [],
      selectedBook: null
    },
    actions: {
      async updateBooks ({ commit }) {
        let response = await axios.get('/api/books')

        if (response.status === 200 && response.data) {
          console.log('Updating books with', response.data.length)
          commit('updateBooks', response.data)
        }
      }
    },
    mutations: {
      updateBooks: (state, books) => {
        state.books = books
      }
    }
  })
}

export default createStore
