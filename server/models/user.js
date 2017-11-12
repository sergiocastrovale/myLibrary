import Bookshelf from '../../db/database'

class User extends Bookshelf.Model {
  get tableName () {
    return 'users'
  }

  verifyPassword (password) {
    return this.get('password') === password
  }

  static findByEmail (email) {
    this.forge().query({where: { email: email }}).fetch().then(results => {
      return results
    })
  }

  static getAll () {
    this.fetchAll().then(results => {
      return results
    })
  }
}

export default User
