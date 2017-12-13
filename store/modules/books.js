import axios from './../../plugins/axios'

const state = {
  list: [],
  query: '',
  page: 1,
  size: 3,
  count: 0
}

const actions = {
  async updateList ({ state, commit }, page) {
    if (page !== undefined && page) {
      commit('setPage', page)
    } else {
      page = state.page
    }

    let response = await axios.get('/api/books/getAll', { params: {
      page: page,
      size: state.size
    }})

    if (response.status === 200 && response.data) {
      commit('setCount', response.data.total)
      commit('updateList', response.data.results)
    }
  },
  async updateQuery ({ state, commit }, query) {
    commit('setQuery', query)
  },
  async filterByFavorites ({ commit }) {
    let response = await axios.get('/api/books/filterByFavorites')

    if (response.status === 200 && response.data) {
      commit('setCount', response.data.length)
      commit('updateList', response.data)
    }
  },
  async filterByPDF ({ commit }) {
    let response = await axios.get('/api/books/filterByPDF')

    if (response.status === 200 && response.data) {
      commit('setCount', response.data.length)
      commit('updateList', response.data)
    }
  },
  async searchInCollection ({ state, commit }, query) {
    let response = await axios.get('/api/books/search/:query', { params: {
      query: query
    }})

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
  setPage: (state, page) => {
    state.page = page
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
