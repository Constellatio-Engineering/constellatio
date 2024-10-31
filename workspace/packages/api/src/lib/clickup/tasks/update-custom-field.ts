import { env } from "@constellatio/env";
import axios from "axios";

import { type CustomFieldInsert } from "../types";
import { clickupRequestConfig } from "../utils";

type UpdateClickupCustomFieldProps = {
  taskId: string;
  updatedCustomField: CustomFieldInsert;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateClickupCustomField = async ({ taskId, updatedCustomField }: UpdateClickupCustomFieldProps) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}/field/${updatedCustomField.id}`, { value: updatedCustomField.value }, clickupRequestConfig);
};

