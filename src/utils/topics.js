const { Octokit } = require('@octokit/core')

const searchTopics = async (q, options, octokitOptions) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

  const response = await octokit
    .request('GET /search/topics', {
      q,
      per_page: 100,
      ...octokitOptions,
    })
    .then(({ data }) => data.items)

  let topics = response.map(async (topic) => {
    const repos_count = await getReposCount(topic.name)
    const html_url = `https://github.com/topics/${topic.name}`
    return { ...topic, html_url, repos_count }
  })

  return (await Promise.all(topics))
    .sort((a, b) => b.repos_count - a.repos_count)
    .map((topic, i) => ({ rank: i + 1, ...topic }))
    .slice(0, options.max_results)
}

const getReposCount = async (topicName) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

  const response = await octokit
    .request('GET /search/repositories', {
      q: `topic:${topicName}`,
      per_page: 100,
    })
    .then(({ data }) => data.total_count)

  return response
}

module.exports = {
  searchTopics,
}
