import { Router } from 'express'
import bookController from './../controllers/bookController'

const router = Router()

// Search for books.

router.get('/search/:query', bookController.get);

export default router
