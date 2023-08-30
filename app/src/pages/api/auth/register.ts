import { supabaseAdmin } from "@/lib/supabase-admin";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => 
{
  if(req.method !== "POST") 
  {
    return res.status(400).json({ message: "Invalid request" });
  }

  const body = registrationFormSchema.parse(JSON.parse(req.body));
  const supabase = createServerSupabaseClient({ req, res });

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if(signUpError)
  {
    console.log("error while signing up", signUpError);
    return res.status(400).json({ message: signUpError.message });
  }

  const { data: upsertData, error: upsertError } = await supabaseAdmin
    .from("profiles")
    .upsert({
      displayName: body.displayName,
      firstName: body.firstName,
      gender: body.gender,
      id: signUpData.user?.id ?? "",
      lastName: body.lastName,
      semester: body.semester,
      university: body.university,
    })
    .select();

  if(upsertError)
  {
    console.log("error while upserting", upsertError);
  }

  console.log("upsertData", upsertData);

  return res.status(200).json(signUpData.session);
};

export default handler;
