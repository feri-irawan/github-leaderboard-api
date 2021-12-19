const repos = require('../controllers/repos')

module.exports = (fastify, options, done) => {
  fastify.get('/', repos.index)
  fastify.get('/stars', repos.stars)
  fastify.get('/forks', repos.forks)
  fastify.get('/size', repos.size)

  done()
}
