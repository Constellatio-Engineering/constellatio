/* eslint-disable react/jsx-max-props-per-line, max-lines, @typescript-eslint/naming-convention */

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

import axios from "axios";

export const internTrackingFromPosthogRouter = createTRPCRouter({
  getCasesSolveTimeAverage: protectedProcedure.query(async () => 
  {
    const posthogApiKey = "phx_wHkv6h91qiusqsDb29edipj31v9oRxA5sgK99dvvdpw";
    const apiUrl = `https://eu.posthog.com/api/event/?personal_api_key=${posthogApiKey}`;

    type TPostHogEvent = {
      distinct_id: string;
      event: string;
      properties: {
        $current_url: string;
      };
      timestamp: string;
    };

    type TReducedEvent = {
      current_url: string;
      distinct_id: string;
      event: string;
      timestamp: string;
    };
    
    const all_events_from_posthog: TReducedEvent[] = [];
    
    const getEventsFromPosthog = async (apiUrl: string): Promise<void> => 
    {
      try 
      {
        const response = await axios.get(apiUrl);
    
        if(response.data.results) 
        {
          response.data.results.forEach((event: TPostHogEvent) => 
          {
            const {
              distinct_id,
              event: eventName,
              properties,
              timestamp
            } = event;
            const { $current_url } = properties;
    
            if(distinct_id && timestamp && $current_url) 
            {
              all_events_from_posthog.push({
                current_url: $current_url,
                distinct_id,
                event: eventName,
                timestamp
              });
            }
          });
        }

        if(response.data.next) 
        {
          await getEventsFromPosthog(response.data.next);
        }
      }
      catch (error) 
      {
        console.error(error);
        return;
      }
    };
    
    await getEventsFromPosthog(apiUrl);
       
    const filterAndOrganizeEvents = (events: TReducedEvent[]): Record<string, TReducedEvent[]> => 
    {
      const distinctIdsSet = new Set<string>();

      events.forEach((event) => 
      {
        distinctIdsSet.add(event.distinct_id);
      });
    
      const organizedEventsByUsers: Record<string, TReducedEvent[]> = {};
    
      distinctIdsSet.forEach((distinct_id) => 
      {
        organizedEventsByUsers[distinct_id] = events.filter(
          (event) => event.distinct_id === distinct_id
        );
      });
    
      return organizedEventsByUsers;
    };
    
    const eventsByDistinctId = filterAndOrganizeEvents(all_events_from_posthog);
  
    const getCasesFinishedByDistinctId = (eventsByDistinctId: Record<string, TReducedEvent[]>): Record<string, string[]> => 
    {
      const caseUrlsByUser: Record<string, string[]> = {};
    
      Object.keys(eventsByDistinctId).forEach((distinct_id) => 
      {
            
        const userEvents = eventsByDistinctId[distinct_id];
        const startedUrls = new Set<string>();
        const finishedUrls = new Set<string>();
    
        if(userEvents) 
        {
          userEvents.forEach((event) => 
          {
            if(event.event === "case_solving_started") 
            {
              startedUrls.add(event.current_url);
            }
            if(event.event === "case_solving_finished") 
            {
              finishedUrls.add(event.current_url);
            }
          });

          if(startedUrls.size < 1 || finishedUrls.size < 1)
          {
            return;
          }
      
          const commonUrls = new Set([...startedUrls].filter(url => finishedUrls.has(url)));
      
          if(!caseUrlsByUser[distinct_id]) 
          {
            caseUrlsByUser[distinct_id] = [];
          }

          commonUrls.forEach(url => 
          {
            caseUrlsByUser[distinct_id]!.push(url);
          });
        }
      });
    
      return caseUrlsByUser;
    };
    
    const casesFinishedByDistinctId = getCasesFinishedByDistinctId(eventsByDistinctId);

    const getAbsoluteAverageTimeByCases = (casesFinishedByDistinctId: Record<string, string[]>, eventsByDistinctId: Record<string, TReducedEvent[]>): Record<string, number> => 
    {
      
      const caseAverageDurations: Record<string, number[]> = {};
      
      Object.keys(casesFinishedByDistinctId).forEach((distinct_id) => 
      {
        casesFinishedByDistinctId[distinct_id]?.forEach((case_id) => 
        {
          const allEventsForCaseIdByDistinctId = eventsByDistinctId[distinct_id];
          const event_windows_by_case_id: TReducedEvent[][] = [];
          let windowIsOpen = false;

          if(allEventsForCaseIdByDistinctId)
          {
            allEventsForCaseIdByDistinctId.forEach((event) => 
            {
              if(event.event === "case_solving_finished" && event.current_url === case_id)
              {
                event_windows_by_case_id.push([event]);
                windowIsOpen = true;
              } 
              else 
              {
                if(windowIsOpen)
                {
                  const windowToInsert = event_windows_by_case_id.length ? event_windows_by_case_id.length - 1 : 0;

                  if(event_windows_by_case_id[windowToInsert])
                  {
                    event_windows_by_case_id[windowToInsert]!.push(event);
                  }
                  
                  if(event.event === "case_solving_started" && event.current_url === case_id)
                  {
                    windowIsOpen = false;
                  }
                }
              }
            });
            
            let case_duration_sum = 0;

            event_windows_by_case_id.forEach((window) => 
            {
              for(let i = 0; i < window.length - 1; i++) 
              {
                const currentEvent = window[i];
                const nextEvent = window[i + 1];

                if(currentEvent?.current_url !== case_id ||
                   nextEvent?.current_url !== case_id ||
                   nextEvent?.event === "$pageleave" ||
                   nextEvent?.event === "$visibilityOff")
                {
                  continue;
                }
                case_duration_sum += new Date(currentEvent!.timestamp).getTime() - new Date(nextEvent!.timestamp).getTime();

              }
            });

            const case_duration_average_by_user = case_duration_sum / event_windows_by_case_id.length;

            if(!caseAverageDurations[case_id]) 
            {
              caseAverageDurations[case_id] = [];
            }

            caseAverageDurations[case_id]?.push(case_duration_average_by_user);
          }
        });
      });

      const absoluteAverageTimeByCases: Record<string, number> = {};

      for(const key in caseAverageDurations) 
      {
        if(Object.prototype.hasOwnProperty.call(caseAverageDurations, key)) 
        {
          const durations = caseAverageDurations[key];
          if(durations)
          {
            const sum = durations.reduce((acc, value) => acc + value, 0);
            const average = sum / durations.length;  
            absoluteAverageTimeByCases[key] = average;
          }
        }
      }

      return absoluteAverageTimeByCases;
    };
    
    const absoluteAverageTimeByCases = getAbsoluteAverageTimeByCases(casesFinishedByDistinctId, eventsByDistinctId);

    return absoluteAverageTimeByCases;
  })
});

/* 
TODOS:

- add number of users which are included in the average
- Wichtiger: nur die case_id nicht die ganze url verwenden und eventuell noch die Namen ziehen?

*/
