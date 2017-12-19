import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books/getAll', bookController.getAll)
router.get('/books/search/:query', bookController.searchInCollection)
router.post('/book/add', bookController.add)
router.get('/books/edit/:id', bookController.edit)
router.post('/book/edit', bookController.doEdit)
router.post('/book/create', bookController.create)
router.post('/book/toggleFavorite', bookController.addToFavorites)
router.post('/book/updateFile', bookController.updateFile)
router.post('/book/remove', bookController.remove)
router.get('/books/findByGoogleId', bookController.findByGoogleId)
router.get('/books/filterByFavorites', bookController.filterByFavorites)
router.get('/books/filterByPDF', bookController.filterByPDF)
router.get('/books/filterByUser/:id', bookController.filterByUser)

export default router
