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

  const response = await fetch(`https://api.vercel.com/v6/deployments?limit=2&target=${target}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
    }
  })

  if(!response.ok)
  {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json()

  const latestDeploymentId = data.deployments[0].uid;
  const latestDeploymentUrl = data.deployments[0].url;

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
