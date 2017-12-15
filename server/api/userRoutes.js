import { Router } from 'express'
import userController from './../controllers/userController'
import passport from 'passport'

const router = Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }), userController.loginWithGoogle)
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userController.googleCallback)
router.post('/auth/login', userController.login)
router.get('/auth/user', userController.fetch)
router.get('/auth/logout', userController.logout)

export default router
