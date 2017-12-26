import { Router } from 'express'
import userController from './../controllers/userController'

const router = Router()

// Auth routes

router.post('/auth/register', userController.register)
router.post('/auth/login', userController.login)
router.get('/auth/fetch', userController.fetch)
router.get('/auth/logout', userController.logout)

// Other routes

router.get('/users/getAllForSelect/:id', userController.getAllForSelect)
router.post('/user/update', userController.update)

export default router
