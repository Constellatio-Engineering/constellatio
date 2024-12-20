import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getUploadedFilesSchema = z.object({
  fileId: idValidation.optional(),
  folderId: idValidation.nullable().optional(),
});

export type GetUploadedFilesSchema = z.input<typeof getUploadedFilesSchema>;
