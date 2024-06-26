import axios from "axios";

const updateSearchIndexes = async () =>
{
  try
  {
    const response = await axios.post("http://localhost:3010/api/cron/update-search-indexes", undefined, {
      headers: {
        authorization: "Bearer super-secret-cron-key"
      }
    });
    console.log("response from 'update-search-indexes' cronjob:", response.data);
  }
  catch (e)
  {
    console.log("error from 'update-search-indexes' cronjob. Status: ", e);
  }
}

const executeAllCronjobs = async () =>
{
  await updateSearchIndexes();
}

console.log('Running cronjobs...');

void executeAllCronjobs();

setInterval(() =>
{
  void executeAllCronjobs();
}, 5000);
