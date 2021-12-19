module.exports = {
  scrapeUrl: 'https://commits.top',
  endpoints: {
    baseUrl: '/commits-top',
    routes: {
      countries: '/countries',
      commits: '/commits/:country',
      contributions: '/contributions/:country',
      commitsAndContributions: '/commits-and-contributions/:country',
    },
  },
}
