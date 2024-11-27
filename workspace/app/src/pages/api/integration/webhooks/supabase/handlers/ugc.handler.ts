import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { countDistinct, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { uploadedFiles, type UploadedFileSql } from "@constellatio/db/schema";

const getNumberOfUploadedUgcs = async (userId: string): Promise<number> =>
{
  const [files] = await db
    .select({ count: countDistinct(uploadedFiles.id) })
    .from(uploadedFiles)
    .where(eq(uploadedFiles.userId, userId));

  return files?.count ?? 0;
};

const handleBadges = async (numberOfUploadedUgcs: number, userId: string) =>
{
  if(numberOfUploadedUgcs >= 1)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-1", userId });
  }
  if(numberOfUploadedUgcs >= 5)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-5", userId });
  }
  if(numberOfUploadedUgcs >= 10)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-10", userId });
  }
};

export const ugcHandlerUploadedFileInsert = async (record: UploadedFileSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const numberOfUploadedUgcs = await getNumberOfUploadedUgcs(userId);

  await handleBadges(numberOfUploadedUgcs, userId);
};
