import type Stripe from "stripe";

interface PostDataProps 
{
  data?: { price: Stripe.Price };
  url: string;
}

export const postData = async ({ data, url }: PostDataProps): Promise<unknown> =>
{
  console.log("posting,", url, data);

  const res = await fetch(url, {
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({ "Content-Type": "application/json" }),
    method: "POST",
  });

  if(!res.ok) 
  {
    console.log("Error in postData", { data, res, url });

    throw Error(res.statusText);
  }

  return res.json();
};
