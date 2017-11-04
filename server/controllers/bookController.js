import axios from './../../plugins/axios'
import knex from '../../db/knex'

const bookController = {};

bookController.create = (req, res) => {
  knex('books').insert({
    title: req.body.volumeInfo.title
  })
  .then(function(result) {
    return res.status(200).json(result)
  })
  .catch(function(error) {
    return res.status(400).json(error)
  })
}

export default bookController