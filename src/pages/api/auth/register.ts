import { NextApiHandler } from "next";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabase-admin";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid request" });
  }

  const body = registrationFormSchema.parse(JSON.parse(req.body));
  const supabase = createPagesServerClient({ req, res });

  const { error, data } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  const profileUpdate = await supabaseAdmin
    .from("profiles")
    .upsert({
      id: data.user?.id,
      firstName: body.firstName,
      lastName: body.lastName,
      displayName: body.displayName,
      university: body.university,
      semester: body.semester,
      gender: body.gender,
    })
    .select();

  return res.status(200).json(data.session);
};

export default handler;
