const Config = {
  JWT_SECRET: 'mylibauth',
  facebook: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    authorizationURL: 'http://127.0.0.1:3000',
    callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
  },
  google: {
    clientID: '184023464302-nlsb80r8k06s4n2pu579651iv7cs4iak.apps.googleusercontent.com',
    clientSecret: 'l7JjbS0VFVaWRrHnU2gInT3R',
    authorizationURL: 'http://127.0.0.1:3000',
    callbackURL: 'http://127.0.0.1:3000/api/auth/google/callback'
  }
}

module.exports = Config
