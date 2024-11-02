/* eslint-disable max-lines */
import { env } from "@constellatio/env";
import { type NextApiHandler } from "next";

/* import { createClickupChecklist } from "@constellatio/api/lib/clickup/checklists/create-checklist";
import { createClickupChecklistItem } from "@constellatio/api/lib/clickup/checklists/create-checklist-item";
import { createClickupTask } from "@constellatio/api/lib/clickup/tasks/create-task";
import { type ClickupCreateChecklistResponse, type ClickupTask } from "@constellatio/api/lib/clickup/types";
import { getContentTaskCrmData } from "@constellatio/api/lib/clickup/utils";
import { sleep } from "@constellatio/api/utils/common";
import { getAllArticles } from "@constellatio/cms/content/getAllArticles";
import { getAllCases } from "@constellatio/cms/content/getAllCases";
import { AxiosError } from "axios";
import type { NextApiHandler } from "next";

import * as process from "node:process";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const allCases = await getAllCases();
  const allArticles = await getAllArticles();
  let allContent = [...allCases, ...allArticles].filter(Boolean);

  // Remove all content that has already been created (first 108 have already been created)
  allContent = allContent.slice(108);
  allContent = allContent.slice(109);
  console.log("next content to create: ", allContent[0]?.title);

  await sleep(5000);

  const allContentAsCrmData = allContent.map(content => getContentTaskCrmData(content));

  for(let i = 0; i < allContentAsCrmData.length; i++)
  {
    console.log("----------------------");
    console.log(`#${i} - creating task '${allContentAsCrmData[i]!.name}'...`);

    try
    {
      const contentCrmData = allContentAsCrmData[i]!;
      const createTaskResponse = await createClickupTask(env.CLICKUP_CONTENT_TASKS_LIST_ID, contentCrmData);
      const createdTask = createTaskResponse.data as ClickupTask;

      // here we created the checklist and checklist items step by step with multiple requests. Instead, we should have used the task template feature of clickup:
      // https://clickup.com/api/clickupreference/operation/CreateTaskFromTemplate/

      if(createdTask != null)
      {
        console.log("created task. Now Creating checklist...");

        const createChecklistResponse = await createClickupChecklist({
          checklistName: "Content Checkliste",
          taskId: createdTask.id
        });

        const createdChecklist = (createChecklistResponse.data as ClickupCreateChecklistResponse).checklist;

        if(createdChecklist != null)
        {
          console.log("created checklist. Now creating checklist items...");

          await createClickupChecklistItem({
            checklistId: createdChecklist.id,
            itemName: "Grammatik",
          });

          console.log("created checklist item 'Grammatik' successfully");

          await createClickupChecklistItem({
            checklistId: createdChecklist.id,
            itemName: "Inhalt",
          });

          console.log("created checklist item 'Inhalt' successfully");

          await createClickupChecklistItem({
            checklistId: createdChecklist.id,
            itemName: "Schaubilder",
          });

          console.log("created checklist item 'Schaubilder' successfully");
        }
        else
        {
          console.error(`Created checklist is null for ${contentCrmData.name}`);
        }
      }
      else
      {
        console.error(`Created task is null for ${contentCrmData.name}`);
      }

      console.log(`#${i} - finished creating task '${contentCrmData.name}'`);
    }
    catch (e: unknown)
    {
      if(e instanceof AxiosError)
      {
        console.error("AxiosError", e.code, e.response, e.response?.data);
      }
      else
      {
        console.error("unknown error", e);
      }

      process.exit(1);
    }

    await sleep(1000);

    if(i % 18 === 0 && i !== 0)
    {
      console.log(`Created ${i} new content tasks - Pause`);
      await sleep(61000);
    }
  }

  return res.status(200).json({ message: "Finished" });
};*/

// eslint-disable-next-line @typescript-eslint/require-await
const handler: NextApiHandler = async (_req, res): Promise<void> =>
{
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(400).json({ message: "Not implemented" });
};

export default handler;
