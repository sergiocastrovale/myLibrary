import axios from './../../plugins/axios'

const state = {
  list: [],
  query: '',
  page: 1,
  limit: 5,
  count: 0
}

const actions = {
  async updateList ({ state, commit }) {
    let response = await axios.post('/api/books/getAll', {
      limit: state.limit,
      page: state.page
    })

    if (response.status === 200 && response.data) {
      commit('setCount', response.data.total)
      commit('updateList', response.data.results)
    }
  },
  async searchInCollection ({ state, commit }, query) {
    let response = await axios.get('/api/books/search/:query', { params: { query: query } })

    if (response.status === 200 && response.data) {
      commit('setQuery', query)
      commit('setCount', response.data.length)
      commit('updateList', response.data)
    }
  }
}

const mutations = {
  setQuery: (state, query) => {
    state.query = query
  },
  setCount: (state, count) => {
    state.count = count
  },
  updateList: (state, books) => {
    state.list = books
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
