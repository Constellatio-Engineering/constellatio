import { UserPingInsert } from "@/db/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
export async function track(data: UserPingInsert) {
  ///TODO:: call endpoint trpc => data
  //await db.insert(tracking).values(data);
}

/*TODO::CHECK-BY_KOTTI:
id wird optional im type angezeigt aber kann
eigentlich nicht manuell eingegeben werden - soll dass so?
*/

function insertTrackingEventInDB(dataToInsert: UserPingInsert) {
  //1.     check if there is a sessionDurationByPing entry
  //1.1 && if it the url === dataToInsert.url
  //1.2 && if it is less than 20 seconds ago
  //=> updatedAt = dataToInsert.eventTimestamp
  //else inser new row
  //1.
}
//                                                                          ******
//const isInSessionSchedul = await db.select().from(trackingEvents).where(eq(users.id, userId), eq(url, dataToInsert.url),gte(updatedAt));
