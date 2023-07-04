import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
);

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email?: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid,
        },
      };

    if (email) {
      customerData.email = email;
    }

    const customer = await stripe.customers.create(customerData);

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: customer.id })
      .eq("id", uuid);

    if (error) {
      throw error;
    }

    console.log(`New customer created and inserted for ${uuid}`);

    return customer.id;
  }

  return data.stripe_customer_id;
};
