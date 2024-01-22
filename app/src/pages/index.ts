import { env } from "@/env.mjs";
import { getIsUserLoggedInServer } from "@/utils/auth";
import { paths } from "@/utils/paths";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSideProps } from "next";
import { type FunctionComponent } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) =>
{
  console.log("--- index.ts getServerSideProps ---");

  const supabase = createPagesServerClient(ctx, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });
  
  const { isUserLoggedIn } = await getIsUserLoggedInServer(supabase);

  console.log("isUserLoggedIn", isUserLoggedIn, "redirecting to", isUserLoggedIn ? paths.dashboard : paths.login);

  return {
    redirect: {
      destination: isUserLoggedIn ? paths.dashboard : paths.login,
      permanent: false,
    }
  };
};

// This is a dummy component that will never be rendered because of the redirect in getServerSideProps
const Home: FunctionComponent = () => null;

export default Home;
