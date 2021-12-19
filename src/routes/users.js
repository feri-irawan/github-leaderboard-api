const users = require('../controllers/users')

module.exports = (fastify, options, done) => {
  fastify.get('/', users.index)
  
  fastify.get('/followers', users.followers)
  fastify.get('/followers/:location', users.followersByLocation)
  
  fastify.get('/repos', users.repositories)
  fastify.get('/repos/:location', users.repositoriesByLocation)
  
  fastify.get('/commits', users.commits)
  fastify.get('/commits/:location', users.commitsByLocation)
  
  fastify.get('/contribs', users.contributions)
  fastify.get('/contribs/:location', users.contributionsByLocation)

  done()
}
