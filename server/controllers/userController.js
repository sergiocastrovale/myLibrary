import crypto from 'crypto'
import User from '../models/user'

const userController = {}

userController.register = (req, res) => {
  const data = req.body

  // Add the new user. Password will automatically be hashed
  // via User's $beforeInsert

  User.query()
    .insert({
      username: data.username,
      password: data.password,
      email: data.email
    })
    .then(user => {
      console.log(user)
      if (user) {
        res.status(200).json({
          success: true,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        })
      } else {
        res.status(403).json({ success: false, message: 'Unable to create user' })
      }
    }).catch(error => {
      // Test for unique field errors
      
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.indexOf('users_email_unique')) {
          res.status(409).json({ success: false, message: 'This email is already taken.' })
        } else if (error.sqlMessage.indexOf('users_username_unique')) {
          res.status(422).json({ success: false, message: 'This username is already taken.' })
        }
      }
      else {
        res.status(500).json(error.message)
      }
    })
}

// Logs the user in. Accepts both email and username

userController.login = (req, res) => {
  const data = req.body

  // Attempt to find a user from username

  User.query()
    .where('username', '=', data.username)
    .orWhere('email', '=', data.username)
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
        let noUserError = new Error('NoUserFound')
        noUserError.message = 'We weren\'t able to log you in. Maybe your password is wrong?'
        noUserError.code = 'NO_USER_FOUND'
        throw noUserError
      }
    }).catch(error => {
      if (error.code === 'NO_USER_FOUND') {
        res.status(409).json(error.message)
      } else {
        res.status(500).json(error.message)
      }
    })
}

// Gets all users with the currently logged in user in the first position

userController.getAllForSelect = (req, res) => {
  const id = req.params.id

  User.query()
    .select('id', 'username')
    .orderBy('username', 'desc')
    .orderByRaw(User.raw('id = ? desc', [id]))
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
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
            username: user.username,
            email: user.email,
            path: user.path
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

userController.update = (req, res) => {
  User.query()
    .findById(req.body.id)
    .patch(req.body.data)
    .then(updatedUser => {
      res.status(200).json(updatedUser)
    }).catch(error => {
      res.status(500).json(error.message)
    })
}

export default userController
