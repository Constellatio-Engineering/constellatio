import { clickupRequestConfig } from "~/lib/clickup/utils";

import { env } from "@constellatio/env";
import axios from "axios";

type DeleteClickupCustomFieldValueProps = {
  fieldId: string; 
  taskId: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteClickupCustomFieldValue = async ({ fieldId, taskId }: DeleteClickupCustomFieldValueProps) =>
{
  return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}/field/${fieldId}`, clickupRequestConfig);
};
