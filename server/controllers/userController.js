import User from '../models/user'

const userController = {}

userController.login = (req, res) => {
  res.status(200).json({ token: 'bla' })
}

userController.fetch = (req, res) => {
  res.status(200).json({ username: 'usernamez' })
}

userController.logout = (req, res) => {
  res.redirect('/')
}

userController.loginWithGoogle = (req, res) => {
  res.redirect('/')
}

userController.googleCallback = (req, res) => {
  res.redirect('/')
}

export default userController
