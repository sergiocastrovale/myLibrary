import { Router } from 'express'
import userController from './../controllers/userController'

const router = Router()

router.post('/auth/register', userController.register)
router.post('/auth/login', userController.login)
router.get('/auth/fetch', userController.fetch)
router.get('/auth/logout', userController.logout)

export default router
