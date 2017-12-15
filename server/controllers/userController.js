import crypto from 'crypto'
import User from '../models/user'

const userController = {}

userController.login = (req, res) => {
  // Attempt to find a user from username
  User.query()
    .where('username', '=', req.body.username)
    .first()
    .then(user => {
      if (user) {
        const token = crypto.randomBytes(64).toString('hex')

        // Update this user with a new token
        User.query()
          .patchAndFetchById(user.id, { token: token })
          .then(updatedUser => {
            if (updatedUser) {
              res.status(200).json({ myLibraryToken: token })
            } else {
              res.status(403)
            }
          }).catch(error => {
            res.status(500).json(error.message)
          })
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

}

export default userController
