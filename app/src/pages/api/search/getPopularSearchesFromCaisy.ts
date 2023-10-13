import getPopularSearches from "@/services/content/getPopularSearches";

import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (_, res) => 
{
  const resPopularSearches = await getPopularSearches();

  return res.status(200).json(resPopularSearches);
};

export default handler;
