import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books/getAll', bookController.getAll)
router.get('/books/search/:query', bookController.searchInCollection)
router.post('/book/add', bookController.add)
router.get('/books/edit/:id', bookController.edit)
router.post('/book/edit', bookController.doEdit)
router.post('/book/create', bookController.create)
router.post('/book/toggleFavorite', bookController.toggleFavorite)
router.post('/book/updateFile', bookController.updateFile)
router.post('/book/updateNotes', bookController.updateNotes)
router.post('/book/remove', bookController.remove)
router.get('/books/filterByFavorites/:id', bookController.filterByFavorites)
router.get('/books/filterByPDF/:id', bookController.filterByPDF)
router.get('/books/filterByUser/:id', bookController.filterByUser)

export default router
