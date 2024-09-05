import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { FireIcon } from "@/components/Icons/Fire";
import { InfoFilled } from "@/components/Icons/InfoFilled";
import { colors } from "@/constants/styles/colors";
import { api } from "@/utils/api";

import { Tooltip } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./StreakCard.styles";

const StreakCard: FunctionComponent = () =>
{

  const { data: weekStreak, isPending: isWeekStreakPending } = api.streak.getWeeklyStreak.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch every 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;
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
          finalWeekStreak[i]!.isSatisfied = weekStreak[i] ?? false;
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
      <div css={styles.headerWrapper}>
        <BodyText styleType="body-01-regular" css={styles.headerText}>Lernstreak</BodyText>
        <Tooltip 
          label={`Lernstreak – Deine Lernstreak wird aktiviert, wenn du an einem Tag mindestens eine Stunde lernst, 
          einen Fall löst oder im Forum eine Frage stellst oder beantwortest. Du musst nicht jeden Tag aktiv sein, 
          um deine Lernstreak zu halten. In einem Zeitraum von sieben Tagen musst du jedoch an fünf Tagen eine dieser 
          Aktivitäten erledigen. Nicht genutzte Pausetage aus früheren Wochen werden in die nächste Woche übernommen. 
          Halte deine Lernstreak so lange wie möglich aufrecht, um dir besondere Badges zu verdienen.`}>
          <InfoFilled size={14}/>
        </Tooltip>
      </div>
      <div css={styles.streakWrapper}>
        <div css={styles.feuerWrapper}>
          {finalWeekStreak.map((satisfactionObj, index) => (
            <div key={index} css={styles.dayFireWrapper}>
              <FireIcon size={20} color={satisfactionObj.isSatisfied ? colors["brand-01"][4] : "#D3D3D3"}/>
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
          {!isStreakPending && streak && (streak.numStreakDays === 1 ? (<span>Tag</span>) : (<span>Tage</span>))}
          {!isStreakPending && !streak && (
            <>
              <BodyText styleType="body-01-regular" css={styles.streakText}>0</BodyText>
              <span>Tage</span>
            </>
          )}
        </div>
        <div css={styles.fireEmojiWrapper}>
          {!isStreakPending && streak && streak.numStreakDays >= 5 && (<span css={styles.fireEmoji}>🔥</span>)}
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
