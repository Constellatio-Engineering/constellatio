import { folderIdValidation } from "~/routers/documents/document.validation";

import { z } from "zod";

export const getDocumentsSchema = z.object({
  folderId: folderIdValidation.optional()
});

export type GetDocumentsSchema = z.input<typeof getDocumentsSchema>;
