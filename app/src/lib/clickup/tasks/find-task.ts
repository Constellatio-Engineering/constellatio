import { env } from "@/env.mjs";
import { type ClickUpFindTaskParams } from "@/lib/clickup/types";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

// clickup docs:
// https://clickup.com/api/clickupreference/operation/GetTasks/
// https://clickup.com/api/developer-portal/filtertasks/
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const findClickupTask = async (listId: string, params: ClickUpFindTaskParams) =>
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
        localParams.push(`${key}[]=${value}`);
      }
      return localParams.join("&");
    }
    else if("custom_fields" === key)
    {
      return `${key}=${JSON.stringify(params[key])}`;
    }
    return `${key}=${values.toString()}`;
  });

  let finalParams = "";

  if(paramStrings.length > 0) 
  {
    finalParams = "?" + paramStrings.join("&");
  }

  return axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${listId}/task${finalParams}`, clickupRequestConfig);
};
