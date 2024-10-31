import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteFolderSchema = z.object({
  folderId: idValidation
});

export type DeleteFolderSchema = z.input<typeof deleteFolderSchema>;
