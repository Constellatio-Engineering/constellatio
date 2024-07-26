const axios = require("axios");

const playground = async () =>
{
  try
  {
    const response = await axios.post("http://localhost:3010/api/cron/sync-users-to-clickup", undefined, {
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

console.log('Running playground script...');

void playground();

setInterval(() =>
{
  void playground();
}, 61000);
