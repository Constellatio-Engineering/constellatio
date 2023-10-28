import { db } from "@/db/connection";
import { userPings } from "@/db/schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq, and, asc, desc } from "drizzle-orm";
import { z } from "zod";

export const trackingRouter = createTRPCRouter({
  ping: protectedProcedure
    .input(
      z.object({
        url: z.string().refine(
          (value) => {
            const isFullURL = /^https?:\/\//.test(value);
            const isRelativeURL = value.startsWith("/");
            return isFullURL || isRelativeURL;
          },
          {
            message: "Invalid URL format",
          }
        ),
      })
    )

    .mutation(async ({ ctx: { userId }, input: { url } }) => {
      /*  const test = await db.query.userPings.findMany({
        orderBy: [asc(userPings.updatedAt)],
      });

      const tableData = {};

      test.forEach((t) => {
        const converted = new Date(t.updatedAt).toLocaleString("de-DE");
        tableData[t.id] = {
          Date: converted,
          URL: t.url,
          pingCount: t.pingCount,
        };
      });

      console.table(tableData); */

      //ABSPEICHERN DER DATEN--------------------------------------------------------------------
      const currentTimeInMs = Date.now();
      const timestampSchedulInMs = 1000 * 60;

      const sessionPing = await db
        .select()
        .from(userPings)
        .orderBy(desc(userPings.updatedAt))
        .where(and(eq(userPings.userId, userId), eq(userPings.url, url)))
        .limit(1);

      if (
        !sessionPing ||
        sessionPing.length === 0 ||
        !sessionPing[0]?.updatedAt
      ) {
        await db.insert(userPings).values({
          userId: userId,
          url: url,
        });
      } else {
        const sessionUpdatedAtTimeInMs = new Date(
          sessionPing[0].updatedAt
        ).getTime();

        const timeDifference = currentTimeInMs - sessionUpdatedAtTimeInMs;

        if (timeDifference > timestampSchedulInMs) {
          await db.insert(userPings).values({
            userId: userId,
            url: url,
          });
        } else {
          await db
            .update(userPings)
            .set({
              updatedAt: new Date(),
              pingCount: sessionPing[0].pingCount + 1,
            }) // Use new Date() to set the current date
            .where(eq(userPings.id, sessionPing[0].id));
        }
      }

      //AUSWERTUNG DER DATEN--------------------------------------------------------------------

      //1.sum of timestamps per user / all users (or only minimal active users?)
      const trackingData = await db.select().from(userPings);

      //1.1 fasse in die time separierte array version zusammen => arr[year][monthOfYear][weekOfMonth][DayOfWeek]
      //1.2 get number of diffrent users (würde nur aktive einschließen, wenn wirklich alle user einbezogen werden sollen dann müsste man db.users.count machen)
      //1.3 sum all session durations
      //1.4 divide 1.3 / 1.2 => average of use time in a DAY
      //1.5 divide 1.4 / 1000 / 60 => get minutes

      //1.1
      const obj = {};

      trackingData.forEach((item) => {
        const createdAt = new Date(item.createdAt);

        const year = createdAt.getFullYear().toString();
        const month = (createdAt.getMonth() + 1).toString(); // Month is 0-based, so add 1 to get the actual month.
        const day = createdAt.toISOString().split("T")[0]; // Extract the date string in 'YYYY-MM-DD' format.

        if (!obj[year]) obj[year] = {};
        if (!obj[year][month]) obj[year][month] = {};
        if (!obj[year][month][day]) obj[year][month][day] = [];

        obj[year][month][day].push(item);
      });

      //1.2
      for (const year in obj) {
        for (const month in obj[year]) {
          for (const day in obj[year][month]) {
            const uniqueUserIds = new Set();
            let sumOfSessionDuration = 0;

            obj[year][month][day].forEach((item) => {
              uniqueUserIds.add(item.userId);

              // Assuming you have 'updatedAt' and 'createdAt' properties in each item
              const createdAt = new Date(item.createdAt);
              const updatedAt = new Date(item.updatedAt);

              const sessionDuration = updatedAt - createdAt;
              sumOfSessionDuration += sessionDuration;
            });
            const numberOfUniqueUserIds = uniqueUserIds.size;

            obj[year][month][day]["numberOfUniqueUserIds"] =
              numberOfUniqueUserIds;
            obj[year][month][day]["sumOfSessionDuration"] =
              sumOfSessionDuration;
            obj[year][month][day]["averageOfUseTimeInMins"] =
              sumOfSessionDuration /
              1000 /
              60 /
              obj[year][month][day]["numberOfUniqueUserIds"];

            console.log(obj[year][month][day]["numberOfUniqueUserIds"]);
            console.log(obj[year][month][day]["sumOfSessionDuration"]);
            console.log(obj[year][month][day]["averageOfUseTimeInMins"]);
          }
        }
      }

      //1.3 sum of all session durations at day

      //2. in welchen stunden sind die meisten sessions
    }),
});
