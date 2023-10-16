import { env } from "@/env.mjs";

import { initSdk } from "@caisy/sdk";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers["x-auth"] !== env.CAISY_WEBHOOKS_SECRET_KEY)
  {
    console.log("Unauthorized request");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(req.method !== "POST")
  {
    console.log("Invalid request method");
    return res.status(400).json({ message: "Invalid request method" });
  }

  const sdk = initSdk({
    token: "1",
  });

  console.log("Received webhook request from Caisy", req, req.body);

  return res.status(200).json({ message: "Success" });
};

export default handler;
