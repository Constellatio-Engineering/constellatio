import { folderIdValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const getDocumentsSchema = z.object({
  folderId: folderIdValidation
});

export type GetDocumentsSchema = z.input<typeof getDocumentsSchema>;
