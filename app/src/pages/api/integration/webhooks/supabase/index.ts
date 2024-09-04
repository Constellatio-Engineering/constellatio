import { type NextApiHandler } from "next";

import streakHandler from "./handlers/streak.handler";

export type SupabaseWebhookPayload = InsertPayload | UpdatePayload | DeletePayload;

type InsertPayload = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  old_record: null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: any;
  schema: string;
  table: string;
  type: "INSERT";
};
  type UpdatePayload = {
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
    old_record: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    record: any;
    schema: string;
    table: string;
    type: "UPDATE";
  };
  type DeletePayload = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
    old_record: any;
    record: null;
    schema: string;
    table: string;
    type: "DELETE";
  };

const handler: NextApiHandler = async (req, res) =>
{

  if(req.method !== "POST") 
  {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { payload }: { payload: SupabaseWebhookPayload } = req.body;

  const handlers = [streakHandler(payload)];

  await Promise.all(handlers);

  return res.status(200).json({ message: "Success" });
};

export default handler;
