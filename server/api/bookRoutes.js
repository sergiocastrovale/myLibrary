import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books', bookController.get)
router.get('/books/create', bookController.create)
router.post('/book/create', bookController.doCreate)

export default router
