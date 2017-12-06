import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

let nuxt = null

// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  // Explicitly override BABEL_ENV='production' here because
  // ava sets NODE_ENV='test' which breaks babel-preset-vue-app,
  // which in turn breaks uglify-js, which breaks our build.

  process.env.BABEL_ENV = 'production'

  const rootDir = resolve(__dirname, '..')
  let config = {}

  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}

  config.rootDir = rootDir
  config.dev = false

  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()

  nuxt.listen(4000, 'localhost')
})

test('Route / exists and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.list')
  t.is(element)
})

// Close the Nuxt server
test.after('Closing server', t => {
  nuxt.close()
})
