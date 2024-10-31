import { z } from "zod";

import { folderIdValidation } from "../../common/documents/document.validation";

export const getDocumentsSchema = z.object({
  folderId: folderIdValidation.optional()
});

export type GetDocumentsSchema = z.input<typeof getDocumentsSchema>;
