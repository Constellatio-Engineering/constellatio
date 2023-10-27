import { env } from "@/env.mjs";
import { getIsUserLoggedIn } from "@/utils/auth";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSideProps } from "next";
import { type FunctionComponent } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) =>
{
  const supabase = createPagesServerClient(ctx, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });
  
  const isUserLoggedIn = await getIsUserLoggedIn(supabase);

  return {
    redirect: {
      destination: isUserLoggedIn ? "/dashboard" : "/login",
      permanent: false,
    }
  };
};

// This is a dummy component that will never be rendered because of the redirect in getServerSideProps
const Home: FunctionComponent = () => null;

export default Home;
