import axios from './../../plugins/axios'

const bookController = {};

bookController.get = (req, res) => {
  axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:0735619670').then((response) => {
    res.json(response.items)
  });
}

export default bookController