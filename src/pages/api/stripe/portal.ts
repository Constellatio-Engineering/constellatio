import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createOrRetrieveCustomer } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";
import { getURL } from "@/lib/get-url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const supabase = createPagesServerClient({ req, res });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not found");
      }

      const stripeCustomerId = await createOrRetrieveCustomer({
        uuid: user.id,
        email: user.email,
      });

      const { url } = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${getURL()}/settings/billing`,
      });

      return res.status(200).json({
        url,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          statusCode: 500,
          // @ts-ignore
          message: error.message,
        },
      });
    }
  } else {
    return res.status(405).setHeader("Allow", "POST");
  }
}
