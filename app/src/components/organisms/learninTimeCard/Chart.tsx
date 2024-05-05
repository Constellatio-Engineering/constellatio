import type { AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import type { inferProcedureOutput } from "@trpc/server";
import { type FunctionComponent, PureComponent, type ReactNode, useEffect } from "react";
import {
  Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { type TickItem } from "recharts/types/util/types";

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

const Tick: FunctionComponent = () =>
{
  return <span>T</span>;
};

// eslint-disable-next-line react/prefer-stateless-function
class CustomizedAxisTick extends PureComponent<any>
{
  public render(): ReactNode
  {
    console.log("render", this.props);

    const {
      payload,
      stroke,
      x,
      y
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }
}

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

  const processedData = data.map(dataPoint => ({
    date: dataPoint.date.toLocaleDateString("de", { weekday: "short" }),
    totalUsage: dataPoint.totalUsage
  }));

  type DataPoint = typeof processedData[number];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={processedData} barSize={"7%"} margin={{ left: -20 }}>
        <CartesianGrid strokeDasharray="4" vertical={false} opacity={1}/>
        <XAxis
          dataKey={"date" satisfies keyof DataPoint}
          tick={<CustomizedAxisTick/>}
        />
        <YAxis
          axisLine={false}
          tickCount={5}
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
