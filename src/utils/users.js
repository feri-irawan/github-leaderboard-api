const { Octokit } = require('@octokit/core')
const { countries } = require('../constants/commits-top')
const commitsTop = require('./commits-top')

// Mencari users
const searchUsers = async (q, options) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

  // Menapatkan users
  const response = await octokit
    .request('GET /search/users', {
      q,
      per_page: 100,
    })
    .then(({ data }) => data.items)

  // Mendapatkan informasi lengkap users
  const users = await Promise.all(
    response.map(async ({ login }) => await getUser(login)),
  )

  return users
    .sort((a, b) => b[options.sort] - a[options.sort])
    .map((user, i) => ({ rank: i + 1, ...user }))
    .slice(0, options.max_results)
}

// Mendapatkan user berdasarkan username atau login
const getUser = async (username) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

  const {
    login,
    name,
    avatar_url,
    html_url,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    twitter_username,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at,
  } = await octokit
    .request('GET /users/{username}', {
      username,
    })
    .then(({ data }) => data)

  return {
    login,
    name,
    avatar_url,
    html_url,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    twitter_username,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at,
  }
}

// Mendapatkan semua user
const commitsUsers = async (location = '', by = 'commits', options = {}) => {
  let users = []
  const maxResults = options.max_results ?? 30

  if (location === '') {
    // Global
    users = countries.map(
      async (country) => await commitsTop.users(country, by),
    )
  } else {
    // Berdasarkan negara
    users = await commitsTop.users(location, by)
  }

  // Ignore
  const userIgnore = ['0xrabin', 'JasonGhostDev']

  // Menyusun (informasi user belum lengkap di sini)
  users = (await Promise.all(users))
    .flat()
    .sort((a, b) => b.commits_count - a.commits_count)
    .map((user, i) => ({ rank: i + 1, ...user }))
    .filter(({ login }) => !userIgnore.includes(login))
    .slice(0, maxResults)

  // Memasukkan commits_count ke dalam data user (informasi user lengkap di sini)
  users = users.map(async ({ rank, login, commits_count }) => {
    const {
      name,
      avatar_url,
      html_url,
      company,
      blog,
      location,
      email,
      hireable,
      bio,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    } = await getUser(login)

    return {
      rank,
      login,
      name,
      avatar_url,
      html_url,
      company,
      blog,
      location,
      email,
      hireable,
      bio,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      commits_count,
      created_at,
      updated_at,
    }
  })

  return await Promise.all(users)
}

module.exports = {
  searchUsers,
  getUser,
  commitsUsers,
}
