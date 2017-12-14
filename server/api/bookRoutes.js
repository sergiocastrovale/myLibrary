import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books/getAll', bookController.getAll)
router.get('/books/search/:query', bookController.searchInCollection)
router.post('/book/add', bookController.doAdd)
router.get('/books/edit/:id', bookController.edit)
router.post('/book/edit', bookController.doEdit)
router.post('/book/create', bookController.doCreate)
router.post('/book/toggleFavorite', bookController.doAddToFavorites)
router.post('/book/updateFile', bookController.doUpdateFile)
router.post('/book/remove', bookController.doRemove)
router.get('/books/findByGoogleId/:googleId', bookController.findByGoogleId)
router.get('/books/filterByFavorites', bookController.filterByFavorites)
router.get('/books/filterByPDF', bookController.filterByPDF)

export default router
