import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const deleteDocumentSchema = z.object({
  id: idValidation,
});

export type DeleteDocumentSchema = z.input<typeof deleteDocumentSchema>;
