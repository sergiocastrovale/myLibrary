import Bookshelf from '../../db/database'

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  // Instance functions

  verifyPassword: (password) => {
    return this.get('password') === password
  }
},

// Class (static) functions
{
  findByEmail: (email) => {
    return this.forge().query({where: { email: email }}).fetch()
  }
})

export default User
