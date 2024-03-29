import { idValidation } from "@/schemas/common.validation";
import { contentValidation, folderIdValidation, nameValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const updateDocumentSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    content: contentValidation.optional(),
    folderId: folderIdValidation.optional(),
    name: nameValidation.optional(),
  }),
});

export type UpdateDocumentSchema = z.input<typeof updateDocumentSchema>;
