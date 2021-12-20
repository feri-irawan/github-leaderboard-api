const axios = require('axios')
const cheerio = require('cheerio')
const { scrapeUrl } = require('../constants/commits-top')
const { makeSlug } = require('./string')

// Daftar negara
const countries = async () => {
  // Medapatkan negara
  const results = (await axios.get(scrapeUrl)).data
  const $ = cheerio.load(results)

  // Menyusun negara
  const countries = []

  $('ul.country-list')
    .find('li > a')
    .each((i, element) => {
      const name = $(element).text()
      const slug = $(element).attr('href').replace('.html', '')

      // Membuat object negara
      const country = {
        name,
        slug,
      }

      countries.push(country)
    })

  // Ignore
  const countriesIgnore = ['california', 'new_york'] // Negara ini di ignore karna ada masalah pada halamannya
  return countries.filter(({ slug }) => !countriesIgnore.includes(slug))
}

// Mendapatkan users dengan jumlah commit terbanyak berdasarkan negara
const users = async (countrySlug, by = 'commits') => {
  const countryName =
    countrySlug.toUpperCase().slice(0, 1) +
    makeSlug(countrySlug, '-', ' ').slice(1) // Membuat nama negara
  const slugPrefix = by === 'commits' ? '' : '_public' // Membuat prefix di akhir slug

  // Mendapatkan data
  const results = (
    await axios.get(`${scrapeUrl}/${countrySlug + slugPrefix}.html`)
  ).data

  // Scrape
  const users = []
  const $ = cheerio.load(results)
  const usersNode = $('table.users-list > tbody > tr')
  usersNode.each((i, element) => {
    const td = $(element).find('td')
    const login = $($(td[1]).find('td > a')[0]).text()
    const name = $(td[1]).find('td > br')[0].nextSibling.nodeValue.slice(1, -1)
    const html_url = $($(td[1]).find('td > a')[0]).attr('href')
    const commits_count = Number($(td[2]).text())
    const avatar_url = $(td[3])
      .find('td > img')[0]
      .attribs['data-src'].replace('s=40', 's=100')

    users.push({
      login,
      name,
      html_url,
      commits_count,
      avatar_url,
    })
  })

  return users
}

module.exports = {
  countries,
  users,
}
