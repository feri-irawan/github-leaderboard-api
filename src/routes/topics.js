const { index, repos } = require('../controllers/topics')

module.exports = (fastify, options, done) => {
  fastify.get('/', index)
  fastify.get('/repos', repos)

  done()
}
