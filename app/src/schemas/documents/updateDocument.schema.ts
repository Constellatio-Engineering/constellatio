import { contentValidation, folderIdValidation, idValidation, nameValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const updateDocumentSchema = z.object({
  content: contentValidation.optional(),
  folderId: folderIdValidation.optional(),
  id: idValidation,
  name: nameValidation.optional()
});

export type UpdateDocumentSchema = z.input<typeof updateDocumentSchema>;
