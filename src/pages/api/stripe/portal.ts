import { getURL } from "@/lib/get-url";
import { stripe } from "@/lib/stripe";
import { createOrRetrieveCustomer } from "@/lib/supabase-admin";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) 
{
  if(req.method === "POST") 
  {
    try 
    {
      const supabase = createPagesServerClient({ req, res });
      const {
        data: { user },
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
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({
        error: {
          // @ts-ignore
          message: error.message,
          
          statusCode: 500,
        },
      });
    }
  }
  else 
  {
    return res.status(405).setHeader("Allow", "POST");
  }
}
