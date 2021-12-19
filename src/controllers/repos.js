const { searchRepos } = require('../utils/repos')

// Index
exports.index = (req, rep) => {
  return {
    status: 200,
    message: 'Repos - Github Leaderboard API',
    endpoints: {
      base_route: '/repos',
      routes: {
        stars: '/stars',
        forks: '/forks',
        size: '/size',
      },
    },
  }
}

// Stars
exports.stars = async (req, rep) => {
  const { max_results } = req.query
  const repos = await searchRepos('stars:>1', {
    sort: 'stargazers_count',
    max_results: max_results ?? 30,
  })

  return {
    status: 200,
    message: `Top ${repos.length} repositori dengan jumlah bintang terbanyak - Github Leaderboard API`,
    data: repos,
  }
}

// Forks
exports.forks = async (req, rep) => {
  const { max_results } = req.query
  const repos = await searchRepos('forks:>1', {
    sort: 'forks_count',
    max_results: max_results ?? 30,
  })

  return {
    status: 200,
    message: `Top ${repos.length} repositori dengan jumlah forks terbanyak - Github Leaderboard API`,
    data: repos,
  }
}

// Size
exports.size = async (req, rep) => {
  const { max_results } = req.query

  // Mencari repositori dengan size mulai dari 47GB - 200GB
  const repos = await searchRepos('size:47000000..200000000', {
    sort: 'size',
    max_results: max_results ?? 30,
  })

  return {
    status: 200,
    message: `Top ${repos.length} repositori dengan jumlah size terbesar - Github Leaderboard API`,
    data: repos.sort((a, b) => b.size - a.size),
  }
}
