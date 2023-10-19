import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => 
{
  console.log("----- Auth callback received -----");
  const { code } = req.query;

  console.log("code", code);

  if(code) 
  {
    const supabase = createPagesServerClient({ req, res });
    const result = await supabase.auth.exchangeCodeForSession(String(code));
    console.log("auth token response", result);
  }

  res.redirect("/");
};

export default handler;
