import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe/stripe";
import { sleep } from "@/utils/utils";

import type { NextApiHandler } from "next";
import type Stripe from "stripe";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const customers: Stripe.Customer[] = [];
  let hasMore: boolean;

  do
  {
    const getCustomersResult = await stripe.customers.list({ limit: 100, starting_after: customers[customers.length - 1]?.id });
    // const getCustomersResult = await stripe.customers.list({ email: "kotti97+3012@gmail.com" });
    // const getCustomersResult = await stripe.customers.list({ limit: 3 });
    console.log("getCustomersResult", getCustomersResult.has_more, getCustomersResult.data.length);
    customers.push(...getCustomersResult.data);
    hasMore = getCustomersResult.has_more;
    // hasMore = false;
  }
  while(hasMore);

  console.log("fetched " + customers.length + " customers");

  let counter = 0;

  for(const customer of customers)
  {
    console.log("#" + counter + " - " + customer.name);

    if(customer.address == null)
    {
      console.log("update customer without address");
      await stripe.customers.update(customer.id, { address: { country: "DE" } });
    }

    const customerSubscriptions = await stripe.subscriptions.list({ customer: customer.id });

    if(customerSubscriptions.data.length > 1)
    {
      console.log("customer has more than one subscription, skipping");
      await sleep(1000);
    }
    else if(customerSubscriptions.data.length === 0)
    {
      console.log("customer has no subscription, skipping");
    }
    else
    {
      const automaticTax = customerSubscriptions.data[0]!.automatic_tax;

      if(automaticTax.enabled)
      {
        console.log("automatic tax is enabled");
      }
      else
      {
        console.log("automatic tax is not enabled, enabling it");
        await stripe.subscriptions.update(customerSubscriptions.data[0]!.id, { automatic_tax: { enabled: true } });
      }
    }

    counter++;
  }

  return res.status(200).json(customers);
};

export default handler;
