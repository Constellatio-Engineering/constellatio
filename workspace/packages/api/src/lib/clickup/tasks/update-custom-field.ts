import { type CustomFieldInsert } from "~/lib/clickup/types";
import { clickupRequestConfig } from "~/lib/clickup/utils";

import { env } from "@constellatio/env";
import axios from "axios";

type UpdateClickupCustomFieldProps = {
  taskId: string;
  updatedCustomField: CustomFieldInsert;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateClickupCustomField = async ({ taskId, updatedCustomField }: UpdateClickupCustomFieldProps) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}/field/${updatedCustomField.id}`, { value: updatedCustomField.value }, clickupRequestConfig);
};

