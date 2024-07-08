import { db } from "@/db/connection";
import { env } from "@/env.mjs";

import axios from "axios";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    console.log("req.headers.Authorization", req.headers.authorization);
    return res.status(401).json({ message: "Unauthorized" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let responseData: any = null;

  const customFields = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/field`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json",
    }
  });

  console.log(customFields.data);

  const allUsers = await db.query.users.findMany();

  const crmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
    }
  });

  responseData = crmUsers.data;

  console.log(crmUsers.data);

  /* const createTaskTest = await axios.post(`${env.CLICKUP_API_ENDPOINT}/task`, {
    assignees: ["U02JL4J9V8Z"],
    custom_fields: {
      "123456": "Custom Field Value"
    },
    description: "This is a test task",
    due_date: 1630435200000,
    list: "901506039191",
    name: "Test Task",
    parent: "123456",
    priority: 3,
    status: "open",
    tags: ["tag1", "tag2"],
    time_estimate: 3600,
    time_spent: 1800
  }, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
    }
  });*/

  // console.log(crmUsers.data);

  return res.status(200).json({ data: responseData, message: "Success" });
};

export default handler;
