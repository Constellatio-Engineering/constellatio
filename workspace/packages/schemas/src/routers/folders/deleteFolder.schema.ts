import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const deleteFolderSchema = z.object({
  folderId: idValidation
});

export type DeleteFolderSchema = z.input<typeof deleteFolderSchema>;
