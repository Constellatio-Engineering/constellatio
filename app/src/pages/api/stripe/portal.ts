import { getURL } from "@/lib/get-url";
import { stripe } from "@/lib/stripe";
import { createOrRetrieveCustomer } from "@/lib/supabase-admin";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse>
{
  console.log("handler");

  if(req.method !== "POST")
  {
    return res.status(405).setHeader("Allow", "POST").send("Wrong request method");
  }

  // TODO: Refactor this to add proper error handling

  console.log("stripe portal");

  try
  {
    const supabase = createServerSupabaseClient({ req, res });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if(!user)
    {
      throw new Error("User not found");
    }

    const stripeCustomerId = await createOrRetrieveCustomer({
      email: user.email,
      uuid: user.id,
    });

    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${getURL()}/settings/billing`,
    });

    return res.status(200).json({
      url,
    });
  }
  catch (error: unknown)
  {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}
