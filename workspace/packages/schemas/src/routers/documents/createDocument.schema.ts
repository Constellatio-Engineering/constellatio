import { z } from "zod";

import { idValidation } from "../../common/common.validation";
import { contentValidation, folderIdValidation, nameValidation } from "../../common/documents/document.validation";

export const createDocumentSchema = z.object({
  content: contentValidation,
  folderId: folderIdValidation,
  id: idValidation,
  name: nameValidation
});

export type CreateDocumentSchema = z.input<typeof createDocumentSchema>;
