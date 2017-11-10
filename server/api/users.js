import { Router } from 'express'
import userController from './../controllers/bookController'

const router = Router()

router.get('/login', userController.login)
router.post('/login', userController.doLogin)
router.post('/logout', userController.doLogout)

export default router
