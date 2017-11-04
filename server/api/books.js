import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

router.post('/book/create', bookController.create)

export default router
