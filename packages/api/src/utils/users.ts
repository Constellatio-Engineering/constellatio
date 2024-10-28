import { ProfilePicture } from "@acme/db/schema";
import { env } from "@acme/env";

export const getProfilePictureUrl = (props: Pick<ProfilePicture, "profilePictureSource" | "userId" | "serverFilename" | "url">) =>
{
  if(props.profilePictureSource === "external")
  {
    return props.url!;
  }
  else
  {
    return `https://storage.googleapis.com/${env.GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME}/${props.userId}/${props.serverFilename}`;
  }
};
