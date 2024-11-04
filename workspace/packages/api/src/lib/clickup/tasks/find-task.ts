import { env } from "@constellatio/env";
import axios from "axios";

import { type ClickUpFindTaskParams, type ClickupTask } from "../types";
import { clickupRequestConfig } from "../utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
type GetClickupTaskResponse = { last_page: boolean; tasks: ClickupTask[] };
type FindClickupTaskResponse = GetClickupTaskResponse["tasks"];

// clickup docs:
// https://clickup.com/api/clickupreference/operation/GetTasks/
// https://clickup.com/api/developer-portal/filtertasks/
export const findClickupTask = async (listId: string, params: ClickUpFindTaskParams): Promise<FindClickupTaskResponse> =>
{
  const paramStrings = Object.keys(params).map((key) =>
  {
    const typedKey = key as keyof ClickUpFindTaskParams;

    const values = params[typedKey];

    if(values === undefined || values === null) { return ""; }

    if(["assignees", "statuses", "tags", "watchers"].includes(key)) 
    {
      const localParams: string[] = [];
      for(const value of values as string[]) 
      {
        localParams.push(`${key}[]=${encodeURIComponent(value)}`);
      }
      return localParams.join("&");
    }
    else if("custom_fields" === key)
    {
      return `${key}=${encodeURIComponent(JSON.stringify(params[key]))}`;
    }
    return `${key}=${encodeURIComponent(values.toString())}`;
  });

  let finalParams = "";

  if(paramStrings.length > 0) 
  {
    finalParams = "?" + paramStrings.join("&");
  }

  const result = await axios.get<GetClickupTaskResponse>(`${env.CLICKUP_API_ENDPOINT}/list/${listId}/task${finalParams}`, clickupRequestConfig);
  return result.data.tasks;
};
