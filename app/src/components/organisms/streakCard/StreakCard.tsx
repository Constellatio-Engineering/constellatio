import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { FireIcon } from "@/components/Icons/Fire";
import { InfoFilled } from "@/components/Icons/InfoFilled";
import { colooors } from "@/constants/styles/colors";
import { api } from "@/utils/api";

import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FunctionComponent } from "react";

import * as styles from "./StreakCard.styles";
import { cardsSmallerBreakpoint } from "./StreakCard.styles";

const StreakCard: FunctionComponent = () =>
{
  const isSmallScreen = useMediaQuery(`(max-width: ${cardsSmallerBreakpoint}px)`);
  let days: [string, string, string, string, string, string, string];

  if(isSmallScreen)
  {
    days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  }
  else
  {
    days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  }

  const { data: weekStreak, status } = api.streak.getWeeklyStreak.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch every 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: streak, isPending: isStreakPending } = api.streak.getStreak.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch every 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const currentDay = new Date().getDay();
  const orderedDays = [...days.slice(currentDay), ...days.slice(0, currentDay)];
  const finalWeekStreak = orderedDays.map((day) => { return { day, isSatisfied: false }; });

  if(status === "success")
  {
    for(let i = 0; i < finalWeekStreak.length; i++)
    {
      if(weekStreak[i] !== undefined)
      {
        finalWeekStreak[i]!.isSatisfied = weekStreak[i] ?? false;
      }
    }
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.headerWrapper}>
        <BodyText styleType="body-01-regular" css={styles.headerText}>
          {isSmallScreen ? "Streak" : "Lernstreak"}
        </BodyText>
        <Tooltip
          multiline={true}
          width={500}
          label={`Deine Lernstreak wird aktiviert, wenn du an einem Tag mindestens eine Stunde lernst, 
          einen Fall löst oder im Forum eine Frage stellst oder beantwortest. Du musst nicht jeden Tag aktiv sein, 
          um deine Lernstreak zu halten. In einem Zeitraum von sieben Tagen musst du jedoch an fünf Tagen eine dieser 
          Aktivitäten erledigen. Nicht genutzte Pausetage aus früheren Wochen werden in die nächste Woche übernommen. 
          Halte deine Lernstreak so lange wie möglich aufrecht, um dir besondere Badges zu verdienen.`}>
          <div css={styles.infoIconWrapper}>
            <InfoFilled size={18}/>
          </div>
        </Tooltip>
      </div>
      <div css={styles.numberAndEmojiWrapper}>
        <div css={styles.streakNumberWrapper}>
          {!isStreakPending && streak && (
            <BodyText styleType="body-01-regular" css={styles.streakText}>
              {streak.numStreakDays ?? 0}
            </BodyText>
          )}
          {!isStreakPending && streak && (streak.numStreakDays === 1 ? (
            <span>Tag</span>
          ) : (
            <span>Tage</span>
          ))}
          {!isStreakPending && !streak && (
            <>
              <BodyText styleType="body-01-regular" css={styles.streakText}>0</BodyText>
              <span>Tage</span>
            </>
          )}
        </div>
        {!isStreakPending && streak && streak.numStreakDays >= 5 && (
          <div css={styles.fireEmojiWrapper}>
            <span css={styles.fireEmoji}>🔥</span>
          </div>
        )}
      </div>
      <div css={styles.streakWrapper}>
        <div css={styles.feuerWrapper}>
          {finalWeekStreak.map((satisfactionObj, index) => (
            <div key={index} css={styles.dayFireWrapper}>
              <FireIcon size={20} color={satisfactionObj.isSatisfied ? colooors["brand-01"][4] : "#D3D3D3"}/>
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
      </div>
    </div>
  );
};

export default StreakCard;
