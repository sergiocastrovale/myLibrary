import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books', bookController.get)
router.get('/books/add', bookController.add)
router.post('/book/add', bookController.doAdd)
router.get('/books/edit/:id', bookController.edit)
router.post('/book/edit', bookController.doEdit)
router.get('/books/create', bookController.create)
router.post('/book/create', bookController.doCreate)
router.post('/book/updateFile', bookController.doUpdateFile)

export default router
