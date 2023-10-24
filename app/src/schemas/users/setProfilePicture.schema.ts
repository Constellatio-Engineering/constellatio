import { z } from "zod";

export const setProfilePictureSchema = z.object({
  id: z.string().uuid(),
  serverFilename: z.string()
});

export type SetProfilePictureSchema = z.input<typeof setProfilePictureSchema>;
