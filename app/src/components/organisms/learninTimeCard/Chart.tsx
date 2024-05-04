import type { AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import type { inferProcedureOutput } from "@trpc/server";
import { type FunctionComponent, useEffect } from "react";
import {
  Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const data = [
  {
    amt: 2400,
    name: "Page A",
    pv: 2400,
    uv: 4000,
  },
  {
    amt: 2210,
    name: "Page B",
    pv: 1398,
    uv: 3000,
  },
  {
    amt: 2290,
    name: "Page C",
    pv: 9800,
    uv: 2000,
  },
  {
    amt: 2000,
    name: "Page D",
    pv: 3908,
    uv: 2780,
  },
  {
    amt: 2181,
    name: "Page E",
    pv: 4800,
    uv: 1890,
  },
  {
    amt: 2500,
    name: "Page F",
    pv: 3800,
    uv: 2390,
  },
  {
    amt: 2100,
    name: "Page G",
    pv: 4300,
    uv: 3490,
  },
];

export const Chart: FunctionComponent = () =>
{
  const { data: usageTime } = api.userActivity.getUsageTime.useQuery({
    end: new Date(2024, 4, 6),
    interval: "day",
    start: new Date(2024, 3, 28)
  }, {
    refetchInterval: 5000
  });

  const initialUsageTime: inferProcedureOutput<AppRouter["userActivity"]["getUsageTime"]> = [
    {
      date: new Date(2024, 3, 28),
      totalUsage: 110
    },
    {
      date: new Date(2024, 3, 29),
      totalUsage: 120
    },
    {
      date: new Date(2024, 3, 30),
      totalUsage: 0
    },
    {
      date: new Date(2024, 4, 1),
      totalUsage: 140
    },
    {
      date: new Date(2024, 4, 2),
      totalUsage: 90
    },
    {
      date: new Date(2024, 4, 3),
      totalUsage: 10
    },
  ];

  const data = /* usageTime ?? */initialUsageTime;

  if(data.length <= 2)
  {
    return <p>Invalid date range</p>;
  }

  const firstDay = data[0]!.date;
  const lastDay = data[data.length - 1]!.date;
  const dayBefore = new Date(firstDay.getTime());
  dayBefore.setDate(firstDay.getDate() - 1);

  console.log("firstDay", firstDay.toLocaleDateString());
  console.log("dayBefore", dayBefore.toLocaleDateString());

  const processedData = data.map(dataPoint => ({
    date: dataPoint.date.valueOf(),
    totalUsage: dataPoint.totalUsage
  }));

  type DataPoint = typeof processedData[number];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis
          dataKey={"date" satisfies keyof DataPoint}
          domain={[processedData[0]!.date, processedData[processedData.length - 1]!.date]}
          scale={"time"}
          type={"number"}
          tickFormatter={dataPoint =>
          {
            return new Date(dataPoint).toLocaleDateString("de", { weekday: "short" });
          }}
        />
        <YAxis/>
        <Bar
          dataKey={"totalUsage" satisfies keyof DataPoint}
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue"/>}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
