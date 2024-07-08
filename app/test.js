const axios = require('axios');

const test = async () =>
{
  try
  {
    const response = await axios.get("http://localhost:3010/api/cron/sync-users-to-clickup");
    console.log(response);
  }
  catch (e)
  {
    console.log(e.message);
  }
}

test();
