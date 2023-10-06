import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const downloadDocumentSchema = z.object({
  documentId: idValidation
});

export type DownloadDocumentSchema = z.input<typeof downloadDocumentSchema>;
