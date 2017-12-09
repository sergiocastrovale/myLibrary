import User from '../models/user'

const userController = {}

userController.login = (req, res) => {

}

userController.logout = (req, res) => {
  req.logout()
  req.session.destroy(() => {
    res.redirect('/')
  })
}

userController.loginWithGoogle = (req, res) => {
  res.redirect('/')
}

userController.googleCallback = (req, res) => {
  res.redirect('/')
}

userController.details = (req, res) => {
  res.status(200).send({ user: req.user })
}

export default userController
