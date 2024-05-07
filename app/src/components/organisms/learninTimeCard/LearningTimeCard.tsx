import ProfileLearningTimeBlockHeader from "@/components/molecules/profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";
import { Chart } from "@/components/organisms/learninTimeCard/Chart";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { convertSecondsToDuration } from "@/utils/dates";

import { type inferProcedureOutput } from "@trpc/server";
import React, { type FunctionComponent, useMemo } from "react";

import * as styles from "./LearninTimeCard.styles";

export type UsageTimeData = inferProcedureOutput<AppRouter["userActivity"]["getUsageTime"]>;

const getInitialUsageTime = (startDate: Date, endDate: Date): UsageTimeData =>
{
  const usageTimeData: UsageTimeData = [];
  const currentDate = new Date(startDate);

  while(currentDate <= endDate)
  {
    usageTimeData.push({
      date: new Date(currentDate),
      totalUsage: 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return usageTimeData;

  /* return [
    {
      date: new Date(2024, 3, 28),
      totalUsage: 400
    },
    {
      date: new Date(2024, 3, 29),
      totalUsage: 1100
    },
    {
      date: new Date(2024, 3, 30),
      totalUsage: 800
    },
    {
      date: new Date(2024, 4, 1),
      totalUsage: 140
    },
    {
      date: new Date(2024, 4, 2),
      totalUsage: 0
    },
    {
      date: new Date(2024, 4, 3),
      totalUsage: 10
    },
  ];*/
};

export const LearningTimeCard: FunctionComponent = () =>
{
  // new Date() needs to be called inside useMemo to avoid infinite re-rendering due to the fact that new Date() is a new object every time
  const intervalEnd = useMemo(() => new Date(), []);
  const intervalStart = useMemo(() =>
  {
    const intervalStart = new Date(intervalEnd);
    intervalStart.setDate(intervalEnd.getDate() - 6);
    return intervalStart;
  }, [intervalEnd]);
  const initialUsageTime = useMemo(() => getInitialUsageTime(intervalStart, intervalEnd), [intervalStart, intervalEnd]);
  const { data: usageTime, isPending } = api.userActivity.getUsageTime.useQuery({
    end: intervalEnd,
    interval: "day",
    start: intervalStart,
    timeZoneOffset: new Date().getTimezoneOffset(),
  }, {
    refetchInterval: 10 * 60 * 1000 // refetch every 10 minutes
  });
  const data = usageTime ?? initialUsageTime;
  const todaysUsage = data[data.length - 1]!.totalUsage;

  console.log("-------------");
  console.log("intervalStart", intervalStart);
  console.log("intervalEnd", intervalEnd);
  console.log("data", data);

  return (
    <div css={styles.wrapper}>
      <ProfileLearningTimeBlockHeader
        todaysLearningTime={convertSecondsToDuration(todaysUsage)}
        isPending={isPending}
      />
      <Chart data={data}/>
    </div>
  );
};
