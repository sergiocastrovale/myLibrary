import { Router } from 'express'
import userController from './../controllers/userController'
import passport from 'passport'

const router = Router()

router.route('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.route('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => { res.redirect('/') })

export default router
