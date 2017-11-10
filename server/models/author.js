import Bookshelf from '../../db/database'

const Author = Bookshelf.Model.extend({
  tableName: 'authors'
})

export default Author
