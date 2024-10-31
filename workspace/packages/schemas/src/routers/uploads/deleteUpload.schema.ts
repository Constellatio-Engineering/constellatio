import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteUploadSchema = z.object({
  fileIds: idValidation.array().nonempty(),
});

export type DeleteUploadSchema = z.input<typeof deleteUploadSchema>;
