const axios = require("axios");

const getLatestVercelDeployment = async () =>
{
  let preferredKey;
  let target = process.argv[3];

  switch(process.argv[2])
  {
    case "prefers-deployment-id":
      preferredKey = "id";
      break;
    case "prefers-deployment-url":
      preferredKey = "url";
      break;
    default:
      throw new Error("preferredKey must be either 'prefers-deployment-id' or 'prefers-deployment-url'");
  }

  if(target !== "production" && target !== "preview")
  {
    throw new Error("target must be either 'production' or 'preview'");
  }

  const accessToken = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if(!accessToken)
  {
    throw new Error("VERCEL_ACCESS_TOKEN is not set");
  }

  if(!projectId)
  {
    throw new Error("VERCEL_PROJECT_ID is not set");
  }

  if(!teamId)
  {
    throw new Error("VERCEL_TEAM_ID is not set");
  }

  let data;

  try
  {
    const axiosResponse = await axios.get(`https://api.vercel.com/v6/deployments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        teamId,
        projectId,
        limit: 1,
        state: "READY"
      }
    })

    data = axiosResponse.data;
  }
  catch (e)
  {
    throw new Error(`Error while getting deployments: ${JSON.stringify(e.response.data)}`);
  }

  const latestDeployment = data.deployments[0];

  if(!latestDeployment)
  {
    throw new Error("No deployments found");
  }

  const latestDeploymentId = latestDeployment.uid;
  const latestDeploymentUrl = latestDeployment.url;

  if(!latestDeploymentId)
  {
    throw new Error("No deployment ID found");
  }

  // output the preferred key so the CI can use it
  if(preferredKey === "id")
  {
    console.log(latestDeploymentId);
  }
  else
  {
    console.log(latestDeploymentUrl);
  }
}

try
{
  void getLatestVercelDeployment()
}
catch (e)
{
  console.log("an error occurred", e);
  process.exit(1);
}
