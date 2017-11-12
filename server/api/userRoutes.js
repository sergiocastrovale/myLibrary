import { Router } from 'express'
import userController from './../controllers/userController'

const router = Router()

router.get('/user/login', userController.login)
router.get('/user/account', userController.login)
router.post('/user/login', userController.doLogin)
router.post('/user/logout', userController.doLogout)

export default router
