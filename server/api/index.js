import { Router } from 'express'

import users from './users'
import books from './books'

const router = Router()

router.use(users)
router.use(books)

export default router
