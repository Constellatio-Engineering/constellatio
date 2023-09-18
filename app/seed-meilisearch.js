const { MeiliSearch } = require('meilisearch')
const movies = require('./movies.json')

const meiliSearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_MASTER_API_KEY
})

meiliSearch
  .index('movies')
  .addDocuments(movies)
  .then((res) => console.log("seeded movies successfully", res))
  .catch((err) => console.log("error while seeding movies", err))
