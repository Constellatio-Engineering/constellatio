import type { AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import type { inferProcedureOutput } from "@trpc/server";
import { type FunctionComponent, PureComponent, type ReactNode, useEffect } from "react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis 
} from "recharts";

type UsageTimeData = inferProcedureOutput<AppRouter["userActivity"]["getUsageTime"]>;

type ConvertSecondsToDuration = (seconds: number) => { hours: number; minutes: number; seconds: number };

const convertSecondsToDuration: ConvertSecondsToDuration = (seconds) =>
{
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};

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

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/no-explicit-any
class CustomizedAxisTick extends PureComponent<any>
{
  public render(): ReactNode
  {
    const {
      index,
      payload,
      visibleTicksCount,
      x,
      y
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={8}
          y={2}
          dy={16}
          textAnchor="end"
          fill="#666"
          fontWeight={visibleTicksCount - 1 === index ? 700 : 400}>
          {payload.value}
        </text>
      </g>
    );
  }
}

export const Chart: FunctionComponent = () =>
{
  const today = new Date();
  const intervalEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const intervalStart = new Date(intervalEnd);
  intervalStart.setDate(intervalEnd.getDate() - 6);

  console.log("----------");
  console.log("intervalStart", intervalStart, intervalStart.toLocaleDateString("de"));
  console.log("intervalEnd", intervalEnd, intervalEnd.toLocaleDateString("de"));
  console.log("end", {
    getTime: intervalEnd.getTime(),
    getTimezoneOffset: intervalEnd.getTimezoneOffset(),
    localDateString: intervalEnd.toLocaleDateString("de"),
    plain: intervalEnd,
    toDateString: intervalEnd.toDateString(),
    toISOString: intervalEnd.toISOString(),
    toString: intervalEnd.toString(),
    toTimeString: intervalEnd.toTimeString(),
    toUTCString: intervalEnd.toUTCString()
  });

  const initialUsageTime = getInitialUsageTime(intervalStart, intervalEnd);
  const { data: usageTime } = api.userActivity.getUsageTime.useQuery({
    end: intervalEnd,
    interval: "day",
    start: intervalStart,
    timeZoneOffset: new Date().getTimezoneOffset(),
  }, {
    refetchInterval: 3000
  });
  const data = usageTime ?? initialUsageTime;
  const processedData = data.map(dataPoint => ({
    date: dataPoint.date.toLocaleDateString("de", { weekday: "short" }),
    totalUsage: dataPoint.totalUsage
  }));

  /* useEffect(() =>
  {
    console.log("---");
    data.forEach(dataPoint =>
    {
      console.log(`Date: ${dataPoint.date.toLocaleDateString("de")} - Total Usage: ${dataPoint.totalUsage}`, typeof dataPoint.totalUsage);
    });
  }, [data]);*/

  if(processedData.length <= 2)
  {
    return <p>Invalid date range</p>;
  }

  type DataPoint = typeof processedData[number];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={processedData}
        barSize={"7%"}
        margin={{ left: -15, right: 5 }}>
        <CartesianGrid strokeDasharray="4" vertical={false} opacity={1}/>
        <XAxis
          dataKey={"date" satisfies keyof DataPoint}
          tick={<CustomizedAxisTick/>}
        />
        <YAxis
          tickFormatter={valueInSeconds =>
          {
            const { hours, minutes, seconds } = convertSecondsToDuration(valueInSeconds);

            if(hours > 0)
            {
              return `${hours}h`;
            }
            else if(minutes > 0)
            {
              return `${minutes}m`;
            }
            else if(seconds === 0)
            {
              return "0";
            }
            else
            {
              return `${seconds}s`;
            }
          }}
          allowDecimals={false}
          axisLine={false}
          tickCount={4}
          tickSize={0}
          tickMargin={8}
        />
        <Bar
          dataKey={"totalUsage" satisfies keyof DataPoint}
          fill="#FF9150"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
