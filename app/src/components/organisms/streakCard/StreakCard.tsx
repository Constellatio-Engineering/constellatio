import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { FireIcon } from "@/components/Icons/Fire";
import { api } from "@/utils/api";

import { type FunctionComponent } from "react";

import * as styles from "./StreakCard.styles";

const StreakCard: FunctionComponent = () =>
{

  const { data: weekStreak, isPending: isWeekStreakPending } = api.streak.getWeeklyStreak.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch every 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const currentDay = new Date().getDay();
  const orderedDays = [...days.slice(currentDay), ...days.slice(0, currentDay)];
  const finalWeekStreak = orderedDays.map((day) => { return { day, isSatisfied: false }; });

  if(!isWeekStreakPending) 
  {
    if(weekStreak) 
    {
      for(let i = 0; i < finalWeekStreak.length; i++)
      {
        if(weekStreak[i] !== undefined) 
        {
          finalWeekStreak[i].isSatisfied = weekStreak[i] ?? false;
        }
      }
    }
  }

  const { data: streak, isPending: isStreakPending } = api.streak.getStreak.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch every 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("weekStreak", weekStreak);
  console.log("streak", streak);
  console.log("diff", 7 - (streak?.numStreakDays ?? 0));

  return (
    <div css={styles.wrapper}>
      <div>
        <BodyText styleType="body-01-regular" css={styles.headerText}>Lernstreak</BodyText>
      </div>
      <div css={styles.streakWrapper}>
        <div css={styles.feuerWrapper}>
          {finalWeekStreak.map((satisfactionObj, index) => (
            <div key={index} css={styles.dayFireWrapper}>
              <FireIcon size={20} color={satisfactionObj.isSatisfied ? "#A90000" : "#D3D3D3"}/>
              {(() => 
              {
                const isGreyText = !isStreakPending && (streak?.numStreakDays ?? 0) < 7 && index < (7 - (streak?.numStreakDays ?? 0));
                return isGreyText ? (
                  <span css={styles.dayTextGrey}>{satisfactionObj.day}</span>
                ) : (
                  <span>{satisfactionObj.day}</span>
                );
              })()}
            </div>
          ))}
        </div>
        <div css={styles.streakNumberWrapper}>
          {!isStreakPending && streak && (
            <BodyText styleType="body-01-regular" css={styles.streakText}>{streak.numStreakDays ?? 0}</BodyText> 
          )}
          {!isStreakPending && streak && streak.numStreakDays === 1 ? (<span>Tag</span>) : (<span>Tage</span>)}
          {!isStreakPending && !streak && (
            <>
              <BodyText styleType="body-01-regular" css={styles.streakText}>0</BodyText>
              <span>Tage</span>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default StreakCard;
