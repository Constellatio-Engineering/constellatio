import { idValidation } from "~/common/common.validation";
import { contentValidation, folderIdValidation, nameValidation } from "~/routers/documents/document.validation";

import { z } from "zod";

export const createDocumentSchema = z.object({
  content: contentValidation,
  folderId: folderIdValidation,
  id: idValidation,
  name: nameValidation
});

export type CreateDocumentSchema = z.input<typeof createDocumentSchema>;