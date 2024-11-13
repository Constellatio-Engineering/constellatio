import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteDocumentSchema = z.object({
  id: idValidation,
});

export type DeleteDocumentSchema = z.input<typeof deleteDocumentSchema>;
