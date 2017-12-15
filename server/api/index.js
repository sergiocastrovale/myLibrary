import { Router } from 'express'

import userRoutes from './userRoutes'
import bookRoutes from './bookRoutes'

const router = Router()

router.use(bookRoutes)
router.use(userRoutes)

export default router
