import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const downloadDocumentSchema = z.object({
  documentId: idValidation
});

export type DownloadDocumentSchema = z.input<typeof downloadDocumentSchema>;
