import { Router } from 'express'
import userController from './../controllers/userController'
import passport from 'passport'

const router = Router()

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userController.googleCallback)
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }), userController.loginWithGoogle)
router.post('/auth/login', userController.login)
router.post('/auth/logout', userController.logout)
router.get('/user/details', userController.details)

export default router
