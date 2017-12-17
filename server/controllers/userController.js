import crypto from 'crypto'
import User from '../models/user'

const userController = {}

userController.register = (req, res) => {
  const data = req.body

  // Add the new user. Password will automatically be hashed
  // via User's $beforeInsert

  User.query()
    .insert({ username: data.username, password: data.password })
    .then(user => {
      if (user) {
        res.status(200).json({ id: user.id, username: user.username })
      } else {
        res.status(403).json({ success: false, message: 'Unable to create user' })
      }
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

userController.login = (req, res) => {
  const data = req.body

  // Attempt to find a user from username

  User.query()
    .where('username', '=', data.username)
    .first()
    .then(user => {
      if (user) {
        // First we need to make sure the password is correct
        // and return 404 if this or any other info fails

        if (user.passwordsMatch(data.password)) {
          // Generate a new token

          const token = crypto.randomBytes(64).toString('hex')

          // Update user with the new token

          User.query()
            .patchAndFetchById(user.id, { token: token })
            .then(updatedUser => {
              if (updatedUser) {
                res.status(200).json({ myLibraryToken: token })
              } else {
                res.status(500).json({ success: false, message: 'Unable to assign a new token' })
              }
            }).catch(error => {
              res.status(500).json(error.message)
            })
        }
      } else {
        res.status(404)
      }
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

userController.fetch = (req, res) => {
  const stripped = req.headers.authorization.split(' ')[1]

  User.query()
    .where('token', '=', stripped)
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({
          success: true,
          user: {
            id: user.id,
            username: user.username
          }
        })
      } else {
        res.status(404).json({ success: false, message: 'Invalid credentials ' })
      }
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

userController.logout = (req, res) => {
  const stripped = req.headers.authorization.split(' ')[1]

  User.query()
    .where('token', '=', stripped)
    .patch({ token: null })
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json({ success: true, message: 'Logged out' })
      } else {
        res.status(403)
      }
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

export default userController
