import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books/getAll', bookController.getAll)
router.get('/books/search/:query', bookController.searchInCollection)
router.get('/books/add', bookController.add)
router.post('/book/add', bookController.doAdd)
router.get('/books/edit/:id', bookController.edit)
router.post('/book/edit', bookController.doEdit)
router.get('/books/create', bookController.create)
router.post('/book/create', bookController.doCreate)
router.get('/books/filterByFavorites', bookController.filterByFavorites)
router.get('/books/filterByPDF', bookController.filterByPDF)
router.post('/book/toggleFavorite', bookController.doAddToFavorites)
router.post('/book/updateFile', bookController.doUpdateFile)

export default router
