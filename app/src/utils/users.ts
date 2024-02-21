import { env } from "@/env.mjs";

export const getProfilePictureUrl = ({ serverFilename, userId }: {serverFilename: string; userId: string}): string =>
{
  return `https://storage.googleapis.com/${env.GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME}/${userId}/${serverFilename}`;
};
