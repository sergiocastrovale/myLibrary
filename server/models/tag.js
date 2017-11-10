import Bookshelf from '../../db/database'

const Tag = Bookshelf.Model.extend({
  tableName: 'tags'
})

export default Tag
