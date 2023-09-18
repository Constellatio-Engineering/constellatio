const { MeiliSearch } = require('meilisearch')
const movies = require('./movies.json')

const meiliSearch = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_MASTER_API_KEY
})

const seedMeiliSearch = async () =>
{
  await meiliSearch.deleteIndexIfExists('movies');
  const createMoviesIndexTask = await meiliSearch.index('movies').addDocuments(movies)

  console.log("creating meilisearch index for movies...");

  const result = await meiliSearch.waitForTasks([createMoviesIndexTask.taskUid], {
    timeOutMs: 1000 * 60 * 5,
    intervalMs: 1000,
  });

  console.log("indexing movies finished: " + result[0].status);
}

void seedMeiliSearch()
