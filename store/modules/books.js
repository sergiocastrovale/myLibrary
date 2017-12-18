import axios from './../../plugins/axios'

const state = {
  list: [],
  typeFilter: 0,
  userFilter: 0,
  query: '',
  page: 1,
  size: 20,
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
  async resetFilter ({ commit }, filter) {
    commit('resetFilter', filter)
  },
  async filterBy ({ commit }, type) {
    let response = null
    let urlPart = 'PDF'

    if (type === 1) {
      urlPart = 'Favorites'
    }

    response = await axios.get('/api/books/filterBy' + urlPart)

    if (response.status === 200 && response.data) {
      commit('setTypeFilter', type)
      commit('setCount', response.data.length)
      commit('updateList', response.data)
    }
  },
  async filterByUser ({ commit }, id) {
    let response = await axios.get('/api/books/filterByUser/' + id)

    if (response.status === 200 && response.data) {
      commit('setUserFilter', id)
      commit('setCount', response.data.length)
      commit('updateList', response.data)
    }
  },
  async searchInCollection ({ state, commit }, query) {
    let response = await axios.get('/api/books/search/' + query)

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
  setUserFilter: (state, value) => {
    state.userFilter = value
  },
  setTypeFilter: (state, value) => {
    state.typeFilter = value
  },
  resetFilter: (state, filter) => {
    if (state[filter] !== undefined) {
      state[filter] = 0
    }
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
