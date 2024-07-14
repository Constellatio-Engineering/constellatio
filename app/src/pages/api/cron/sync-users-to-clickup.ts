import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, clickupRequestConfig, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { eq } from "drizzle-orm";
import type { NextApiHandler } from "next";
import type Stripe from "stripe";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    console.log("req.headers.Authorization", req.headers.authorization);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const allUsers = await db.query.users.findMany({ where: eq(users.email, "kotti97+10004@web.de") });
  const existingCrmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, clickupRequestConfig);

  const getCrmDataForAllUsersPromises = allUsers
    .map(async (user) =>
    {
      const { data: { user: supabaseUserData } } = await supabaseServerClient.auth.admin.getUserById(user.id);

      if(!supabaseUserData)
      {
        return null;
      }

      const userSubscriptionId = user.subscriptionId;
      let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;

      if(userSubscriptionId != null)
      {
        subscriptionData = await stripe.subscriptions.retrieve(userSubscriptionId);
      }

      const crmData = getUserCrmData({
        subscriptionData,
        supabaseUserData,
        user
      });

      return ({
        crmData,
        userData: user
      });
    })
    .filter(Boolean);

  const allUsersWithCrmData = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);

  const newUsers: typeof allUsersWithCrmData = [];
  const existingUsers: Array<{
    existingCrmUser: ClickupTask;
    userWithCrmData: typeof allUsersWithCrmData[number];
  }> = [];

  allUsersWithCrmData.forEach(user =>
  {
    const matchingCrmUser = existingCrmUsers.data.tasks.find((task: ClickupTask) =>
    {
      const emailCustomField = task.custom_fields?.find((field) => field.id === clickupCrmCustomField.email.fieldId);
      return emailCustomField?.value === user.userData.email;
    });

    if(matchingCrmUser)
    {
      existingUsers.push({
        existingCrmUser: matchingCrmUser,
        userWithCrmData: user
      });
    }
    else
    {
      newUsers.push(user);
    }
  });

  /* console.log("newUsers", newUsers);
  console.log("existingUsers", existingUsers);*/

  const customFields = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/field`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json",
    }
  });

  await Promise.all(newUsers.map(async ({ crmData }) => createClickupTask(crmData)));

  const updateUsersPromises: Array<Promise<AxiosResponse>> = [];

  existingUsers.forEach(({ existingCrmUser, userWithCrmData }) =>
  {
    const { crmData, userData } = userWithCrmData;

    if(existingCrmUser.name !== (userData.firstName + " " + userData.lastName))
    {
      console.log("Updating user name from", existingCrmUser.name, "to", userData.firstName + " " + userData.lastName);
      updateUsersPromises.push(updateClickupTask(existingCrmUser.id!, { name: userData.firstName + " " + userData.lastName }));
    }

    crmData.custom_fields.forEach((field) =>
    {
      if(field.id === clickupCrmCustomField.category.fieldId)
      {
        // Skip category field because it's not supposed to be updated automatically after creation
        return;
      }

      const existingCrmField = existingCrmUser.custom_fields?.find((existingField) => existingField.id === field.id);

      if(!existingCrmField)
      {
        console.log("Field does not exist yet", field);
        updateUsersPromises.push(updateClickupCustomField({
          taskId: existingCrmUser.id,
          updatedCustomField: field
        }));
        return;
      }

      switch (existingCrmField.type)
      {
        case "drop_down":
        {
          const currentlySelectedOption = existingCrmField.value != null ? existingCrmField.type_config.options[existingCrmField.value] : null;
          const currentlySelectedOptionId = currentlySelectedOption?.id;

          if(currentlySelectedOptionId !== field.value)
          {
            console.log("-------------- mismatch for field " + existingCrmField.name + " --------------");
            console.log("currentlySelectedOption", currentlySelectedOption);
            console.log("new value", field);

            updateUsersPromises.push(updateClickupCustomField({
              taskId: existingCrmUser.id,
              updatedCustomField: field
            }));
          }
          else
          {
            console.log("value for " + currentlySelectedOption?.name + " is the same");
          }

          break;
        }
        case "number":
        case "date":
        {
          if(Number(existingCrmField.value) !== field.value)
          {
            console.log("Updating " + existingCrmField.type + " from", existingCrmField.value, "to", field.value + " for field", existingCrmField.name);

            updateUsersPromises.push(updateClickupCustomField({
              taskId: existingCrmUser.id!,
              updatedCustomField: field
            }));
          }
          else
          {
            console.log(existingCrmField.type + " is the same");
          }
          break;
        }
        case "email":
        {
          if(existingCrmField.value !== field.value)
          {
            console.log("Updating email from", existingCrmField.value, "to", field.value);

            updateUsersPromises.push(updateClickupCustomField({
              taskId: existingCrmUser.id!,
              updatedCustomField: field
            }));
          }
          else
          {
            console.log("Email is the same");
          }

          break;
        }
      }
    });
  });

  console.log(updateUsersPromises.length + " updates to be made...");

  const results = await Promise.allSettled(updateUsersPromises);

  const failedUpdates = results.filter((result) => result.status === "rejected");

  failedUpdates.forEach((failedUpdate: PromiseSettledResult<AxiosError>) =>
  {
    console.log("failed", (failedUpdate.reason));
  });

  return res.status(200).json({ message: "Success", ...customFields.data });
};

export default handler;
