import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const downloadDocumentSchema = z.object({
  documentId: idValidation
});

export type DownloadDocumentSchema = z.input<typeof downloadDocumentSchema>;
