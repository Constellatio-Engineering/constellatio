/* eslint-disable react/jsx-max-props-per-line, max-lines */
import { db } from "@/db/connection";
import { type UserPing, userPings } from "@/db/schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

export const trackingRouter = createTRPCRouter({
  getTrackingData: protectedProcedure.query(async (): Promise<void> => 
  {
    const trackingData: UserPing[] = await db.select().from(userPings);
    const obj: Record<string, Record<string, Record<string, UserPing[]>>> = {};

    trackingData.forEach((item) => 
    {
      const createdAt = new Date(item.createdAt);

      const year = createdAt.getFullYear().toString();
      const month = (createdAt.getMonth() + 1).toString();
      const day = createdAt.toISOString().split("T")[0];

      obj[year] = obj[year] || {};
      obj[year][month] = obj[year][month] || {};
      obj[year][month][day] = obj[year][month][day] || [];

      obj[year][month][day].push(item);
    });

    for(const year in obj) 
    {
      if(Object.prototype.hasOwnProperty.call(obj, year)) 
      {
        for(const month in obj[year]) 
        {
          if(Object.prototype.hasOwnProperty.call(obj[year], month)) 
          {
            for(const day in obj[year][month]) 
            {
              if(Object.prototype.hasOwnProperty.call(obj[year][month], day)) 
              {
                const uniqueUserIds = new Set<number>();
                let sumOfSessionDuration = 0;

                obj[year][month][day].forEach((item) => 
                {
                  uniqueUserIds.add(item.userId);

                  const createdAt = new Date(item.createdAt);
                  const updatedAt = new Date(item.updatedAt);

                  const sessionDuration = updatedAt - createdAt;
                  sumOfSessionDuration += sessionDuration;
                });

                const numberOfUniqueUserIds = uniqueUserIds.size;

                obj[year][month][day].numberOfUniqueUserIds = numberOfUniqueUserIds;
                obj[year][month][day].sumOfSessionDuration = sumOfSessionDuration;
                obj[year][month][day].averageOfUseTimeInMins = sumOfSessionDuration / 1000 / 60 / numberOfUniqueUserIds;
              }
            }
          }
        }
      }
    }

    const hourlyUsage: Record<string, { useTimeInMins: number; userCount: Set<number> }> = {};

    trackingData.forEach((item) => 
    {
      const createdAt = new Date(item.createdAt);
      const updatedAt = new Date(item.updatedAt);
      const offsetMinutes = createdAt.getTimezoneOffset();
      createdAt.setMinutes(createdAt.getMinutes() - offsetMinutes);
      updatedAt.setMinutes(updatedAt.getMinutes() - offsetMinutes);
      const startHour = createdAt.getHours();
      const endHour = updatedAt.getHours();

      for(let hour = startHour; hour <= endHour; hour++) 
      {
        const hourTimestamp = new Date(createdAt);
        hourTimestamp.setHours(hour, 0, 0, 0);
        const hourKey = hourTimestamp.toISOString().slice(0, 19);

        if(!hourlyUsage[hourKey]) 
        {
          hourlyUsage[hourKey] = {
            useTimeInMins: 0,
            userCount: new Set<number>(),
          };
        }

        const sessionStart = Math.max(createdAt, hourTimestamp);
        const sessionEnd = Math.min(updatedAt, new Date(hourTimestamp).setHours(hour + 1, 0, 0, 0));
        const sessionDuration = (sessionEnd - sessionStart) / 60000;

        hourlyUsage[hourKey].useTimeInMins += Math.round(sessionDuration * 10) / 10;
        hourlyUsage[hourKey].userCount.add(item.userId);

        for(const hourKey in hourlyUsage) 
        {
          if(Object.prototype.hasOwnProperty.call(hourlyUsage, hourKey)) 
          {
            hourlyUsage[hourKey].userCount = hourlyUsage[hourKey].userCount.size;
          }
        }
    
        const sortedHourlyUsage = Object.fromEntries(
          Object.entries(hourlyUsage).sort()
        );
    
        const dailyUsageRanges: Record<string, number[]> = {};
    
        for(const hourKey in hourlyUsage) 
        {
          if(Object.prototype.hasOwnProperty.call(hourlyUsage, hourKey)) 
          {
            const date = hourKey.slice(0, 10);
            if(!dailyUsageRanges[date]) 
            {
              dailyUsageRanges[date] = [];
            }
      
            dailyUsageRanges[date].push(hourlyUsage[hourKey].useTimeInMins);
          }
          
        }
    
        for(const date in dailyUsageRanges) 
        {
          if(Object.prototype.hasOwnProperty.call(dailyUsageRanges, date))
          {
            const minUsage = Math.min(...dailyUsageRanges[date]);
            const maxUsage = Math.max(...dailyUsageRanges[date]);
            console.log(
              `Date: ${date}, Min Usage: ${minUsage} mins, Max Usage: ${maxUsage} mins`
            );
          }
        }
    
        const userCaseAvgTime: Record<string, Record<string, { count: number; totalTime: number }>> = {};
    
        for(let index = 0; index < trackingData.length; index++) 
        {
          const item = trackingData[index];
          if(item.url.startsWith("/cases/")) 
          {
            const user = item.userId;
            const createdAt = new Date(item.createdAt);
            const updatedAt = new Date(item.updatedAt);
            const sessionDuration = (updatedAt - createdAt) / 60000;
    
            if(sessionDuration >= 3) 
            {
              if(!userCaseAvgTime[user]) 
              {
                userCaseAvgTime[user] = {};
              }
              if(!userCaseAvgTime[user][item.url]) 
              {
                userCaseAvgTime[user][item.url] = { count: 0, totalTime: 0 };
              }
    
              if(index > 0) 
              {
                const prevItem = trackingData[index - 1];
                const prevUpdatedAt = new Date(prevItem.updatedAt);
                const timeGap = (createdAt - prevUpdatedAt) / 60000;
    
                if(
                  prevItem.userId === user &&
                  prevItem.url === item.url &&
                  timeGap < 10
                ) 
                {
                  userCaseAvgTime[user][item.url].totalTime += sessionDuration;
                  userCaseAvgTime[user][item.url].count += 1;
                  continue;
                }
              }
    
              userCaseAvgTime[user][item.url].totalTime += sessionDuration;
              userCaseAvgTime[user][item.url].count += 1;
            }
          }
        }
    
        const caseAvgTime: Record<string, { count: number; totalTime: number }> = {};
    
        for(const user in userCaseAvgTime) 
        {
          if(Object.prototype.hasOwnProperty.call(userCaseAvgTime, user))
          {
            for(const caseUrl in userCaseAvgTime[user]) 
            {
              if(Object.prototype.hasOwnProperty.call(userCaseAvgTime[user], caseUrl))
              {
                const { count, totalTime } = userCaseAvgTime[user][caseUrl];
                if(!caseAvgTime[caseUrl]) 
                {
                  caseAvgTime[caseUrl] = { count: 0, totalTime: 0 };
                }
                caseAvgTime[caseUrl].totalTime += totalTime;
                caseAvgTime[caseUrl].count += count;
              }
            }
          }
        }
    
        for(const caseUrl in caseAvgTime) 
        {
          if(Object.prototype.hasOwnProperty.call(caseAvgTime, caseUrl))
          {
            const { count, totalTime } = caseAvgTime[caseUrl];
            const avgTime = totalTime / count;
            console.log(`Durchschnittliche Zeit für Nutzer auf ${caseUrl}: ${avgTime} Minuten`);
          }
        }
      }
    });
  }),

  ping: protectedProcedure
    .input(
      z.object({
        url: z.string().refine(
          (value) => 
          {
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

    .mutation(async ({ ctx: { userId }, input: { url } }) => 
    {
      /* const test = await db.query.userPings.findMany({
        orderBy: [asc(userPings.updatedAt)],
      });

      const tableData = {};

      test.forEach((t) => {
        //console.log(t);

        const converted = new Date(t.updatedAt).toLocaleString("de-DE");
        tableData[t.id] = {
          Date: converted,
          URL: t.url,
          pingCount: t.pingCount,
        };
      });

      console.table(tableData); */

      // ABSPEICHERN DER DATEN--------------------------------------------------------------------
      const currentTimeInMs = Date.now();
      const timestampSchedulInMs = 1000 * 60;

      const sessionPing = await db
        .select()
        .from(userPings)
        .orderBy(desc(userPings.updatedAt))
        .where(and(eq(userPings.userId, userId), eq(userPings.url, url)))
        .limit(1);

      if(
        !sessionPing ||
        sessionPing.length === 0 ||
        !sessionPing[0]?.updatedAt
      ) 
      {
        await db.insert(userPings).values({
          url,
          userId,
        });
      }
      else 
      {
        const sessionUpdatedAtTimeInMs = new Date(
          sessionPing[0].updatedAt
        ).getTime();

        const timeDifference = currentTimeInMs - sessionUpdatedAtTimeInMs;

        if(timeDifference > timestampSchedulInMs) 
        {
          await db.insert(userPings).values({
            url,
            userId,
          });
        }
        else 
        {
          await db
            .update(userPings)
            .set({
              pingCount: sessionPing[0].pingCount + 1,
              updatedAt: new Date(),
            }) // Use new Date() to set the current date
            .where(eq(userPings.id, sessionPing[0].id));
        }
      }
    }),
});
