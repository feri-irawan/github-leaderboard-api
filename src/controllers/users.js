const { commitsUsers } = require('../utils/users')
const { searchUsers } = require('../utils/users')

exports.index = (req, rep) => {
  return {
    status: 200,
    message: 'Users - Github Leaderboard API',
    endpoints: {
      base_route: '/users',
      routes: {
        followers: '/followers',
        followers_by_Location: '/followers/{location}',
        repository: '/repos',
        repository_by_location: '/repos/{location}',
        commits: '/commits',
        commits_by_location: '/commits/{location}',
        contributions: '/contribs',
        contributions_by_location: '/contribs/{location}',
      },
    },
  }
}

// Followers
exports.followers = async (req, rep) => {
  const { max_results } = req.query
  const users = await searchUsers('followers:>1', {
    max_results: max_results ?? 30,
    sort: 'followers',
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah followers terbanyak di Dunia.`,
    data: users,
  }
}

exports.followersByLocation = async (req, rep) => {
  const { location } = req.params
  const { max_results } = req.query
  const users = await searchUsers(`followers:>1 location:${location}`, {
    max_results: max_results ?? 30,
    sort: 'followers',
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah followers terbanyak di ${location}.`,
    data: users,
  }
}

// Repositories
exports.repositories = async (req, rep) => {
  const { max_results } = req.query
  const users = await searchUsers(
    'repos:6000..100000 type:user',
    {
      max_results: max_results ?? 30,
      sort: 'public_repos',
    },
    {
      sort: 'repositories',
    },
  )

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah repositori terbanyak di Dunia.`,
    data: users,
  }
}

exports.repositoriesByLocation = async (req, rep) => {
  const { location } = req.params
  const { max_results } = req.query
  const users = await searchUsers(
    `repos:>1 type:user location:${location}`,
    {
      max_results: max_results ?? 30,
      sort: 'public_repos',
    },
    {
      sort: 'repositories',
    },
  )

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah repositori terbanyak di ${location}.`,
    data: users,
  }
}

// Commits
exports.commits = async (req, rep) => {
  const { max_results } = req.query
  const users = await commitsUsers('', 'commits', {
    max_results,
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah commit terbanyak di Dunia.`,
    data: users,
  }
}

exports.commitsByLocation = async (req, rep) => {
  const { location } = req.params
  const { max_results } = req.query
  const users = await commitsUsers(location, 'commits', {
    max_results,
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah commit terbanyak di ${location}.`,
    data: users,
  }
}

// Contibutions
exports.contributions = async (req, rep) => {
  const { max_results } = req.query
  const users = await commitsUsers('', 'contributions', {
    max_results,
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah kontribusi terbanyak di Dunia.`,
    data: users,
  }
}

exports.contributionsByLocation = async (req, rep) => {
  const { location } = req.params
  const { max_results } = req.query
  const users = await commitsUsers(location, 'contributions', {
    max_results,
  })

  return {
    status: 200,
    message: `Top ${users.length} daftar pengguna Github dengan jumlah kontibusi terbanyak di ${location}.`,
    data: users,
  }
}
