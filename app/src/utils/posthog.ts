import { env } from "@/env.mjs";

import { PostHog } from "posthog-node";

const startPosthogServerClient = (): PostHog => 
{
  const client = new PostHog(
    env.NEXT_PUBLIC_POSTHOG_KEY,
    {
      host: env.NEXT_PUBLIC_POSTHOG_HOST,
    }
  );
  return client;
};

const shutdownPosthogServerClient = async (client: PostHog): Promise<void> => 
{
  await client.shutdownAsync();
};

export { startPosthogServerClient, shutdownPosthogServerClient };
