const { Octokit } = require('@octokit/core')

// Mencari repositori
const searchRepos = async (q, options) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

  const response = await octokit
    .request('GET /search/repositories', {
      q,
      per_page: 100,
    })
    .then(({ data }) =>
      data.items.sort((a, b) => b[options.sort] - a[options.sort]),
    )

  const items = formatRepo(response).slice(0, options.max_results)
  return items
}

// Untuk meyusun bentuk object dari data repo
const formatRepo = (repos) => {
  return repos.map(
    (
      {
        name,
        description,
        html_url,
        size,
        stargazers_count,
        forks_count,
        watchers_count,
        language,
        owner,
      },
      i,
    ) => ({
      rank: i + 1,
      name,
      description,
      html_url,
      size,
      stargazers_count,
      forks_count,
      watchers_count,
      language,
      owner: {
        login: owner.login,
        avatarUrl: owner.avatar_url,
        url: owner.html_url,
      },
    }),
  )
}

module.exports = {
  searchRepos,
}
