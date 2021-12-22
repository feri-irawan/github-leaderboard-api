const { searchTopics } = require('../utils/topics')

// Index
exports.index = (req, rep) => {
  return {
    status: 200,
    message: 'Topics - Github Leaderboard API',
    endpoints: {
      base_route: '/topics',
      routes: {
        repos: '/repos',
      },
    },
  }
}

// Repos
exports.repos = async (req, rep) => {
  const topics = await searchTopics(
    'repositories:>=14000',
    {
      max_results: 30,
    },
    {
      sort: 'repositories',
    },
  )

  return {
    status: 200,
    message: `Top ${topics.length} topik dengan jumlah repositori terbanyak - Github Leaderboard API`,
    data: topics,
  }
}
