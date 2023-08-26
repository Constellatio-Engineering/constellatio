import { supabaseAdmin } from "@/lib/supabase-admin";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => 
{
  if(req.method !== "POST") 
  {
    return res.status(400).json({ message: "Invalid request" });
  }

  const body = registrationFormSchema.parse(JSON.parse(req.body));
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if(error)
  {
    console.log("error while signing up", error);
    return res.status(400).json({ message: error.message });
  }

  const profileUpdate = await supabaseAdmin
    .from("profiles")
    .upsert({
      displayName: body.displayName,
      firstName: body.firstName,
      gender: body.gender,
      id: data.user?.id ?? "",
      lastName: body.lastName,
      semester: body.semester,
      university: body.university,
    })
    .select();

  return res.status(200).json(data.session);
};

export default handler;
