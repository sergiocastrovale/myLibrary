import Vuex from 'vuex'
import users from './modules/users'
import books from './modules/books'

export default () => {
  return new Vuex.Store({
    modules: {
      users,
      books
    }
  })
}
