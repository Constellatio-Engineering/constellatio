import { db } from "@/db/connection";
import { uploadFolders, uploadedFiles, documents } from "@/db/schema";
import { createFolderSchema } from "@/schemas/folders/createFolder.schema";
import { deleteFolderSchema } from "@/schemas/folders/deleteFolder.schema";
import { renameFolderSchema } from "@/schemas/folders/renameFolder.schema";
import { deleteFiles } from "@/server/api/services/uploads.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, asc, eq
} from "drizzle-orm";

export const foldersRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(createFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { name } }) =>
    {
      await db.insert(uploadFolders).values({
        name,
        userId
      });
    }),
  deleteFolder: protectedProcedure
    .input(deleteFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      const files = await db.query.uploadedFiles.findMany({
        where: and(
          eq(uploadedFiles.userId, userId),
          eq(uploadedFiles.folderId, folderId)
        )
      });

      await Promise.all([
        deleteFiles({ files, userId }),
        db.delete(documents).where(
          and(
            eq(documents.userId, userId),
            eq(documents.folderId, folderId)
          )
        )
      ]);

      await db.delete(uploadFolders).where(
        and(
          eq(uploadFolders.userId, userId),
          eq(uploadFolders.id, folderId)
        )
      );
    }),
  getFolders: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      return db.query.uploadFolders.findMany({
        orderBy: [asc(uploadFolders.name)],
        where: eq(uploadFolders.userId, userId)
      });
    }),
  renameFolder: protectedProcedure
    .input(renameFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { folderId, newName } }) =>
    {
      await db.update(uploadFolders).set({ name: newName }).where(
        and(
          eq(uploadFolders.userId, userId),
          eq(uploadFolders.id, folderId)
        )
      );
    })
});
