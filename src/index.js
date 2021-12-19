require('dotenv').config()
const fastify = require('fastify')
const fastifyCaching = require('fastify-caching')

const start = async () => {
  const app = fastify({ logger: true })

  app
    // Cors
    .register(require('fastify-cors'))
    // Caching
    .register(fastifyCaching, {
      privacy: 'public',
      expiresIn: 60,
    })
    // Routes
    .register(require('./routes'))
    .register(require('./routes/repos'), { prefix: '/repos' })
    .register(require('./routes/users'), { prefix: '/users' })

  try {
    await app.listen(process.env.PORT || 3000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

module.exports = start()
