const state = {
}

const actions = {
  async login ({ commit }, data) {
    console.log(data)
  },
  async logout ({ commit }) {
    console.log('logout')
  },
  account ({ commit }) {
    console.log('details')
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
