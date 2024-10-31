import { z } from "zod";

import { idValidation } from "../../common/common.validation";
import { contentValidation, folderIdValidation, nameValidation } from "../../common/documents/document.validation";

export const updateDocumentSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    content: contentValidation.optional(),
    folderId: folderIdValidation.optional(),
    name: nameValidation.optional(),
  }),
});

export type UpdateDocumentSchema = z.input<typeof updateDocumentSchema>;
