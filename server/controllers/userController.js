const User = require('../models/user')
const userController = {}

userController.doLogin = (req, res) => {
  return res.json('ok')
}

userController.doLogin = (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }

    return res.json({ username: 'demo' })
  }

  res.status(401).json({ message: 'Bad credentials' })
}

userController.doLogout = (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
}

export default userController
