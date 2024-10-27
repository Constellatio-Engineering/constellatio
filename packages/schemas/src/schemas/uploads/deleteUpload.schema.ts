import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const deleteUploadSchema = z.object({
  fileIds: idValidation.array().nonempty(),
});

export type DeleteUploadSchema = z.input<typeof deleteUploadSchema>;
