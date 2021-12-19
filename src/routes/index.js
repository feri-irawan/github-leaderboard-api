module.exports = (fastify, options, done) => {
  fastify.get('/', (req, rep) => {
    return {
      status: 200,
      message: 'Welcome to Github Leaderboard API',
      routes: {
        users: '/users',
        repositories: '/repos',
      },
    }
  })

  done()
}
