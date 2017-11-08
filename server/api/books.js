import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.get('/books', bookController.get)
router.post('/book/create', bookController.create)

export default router
