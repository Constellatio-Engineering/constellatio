import { type UsageTimeData } from "@/components/organisms/learninTimeCard/LearningTimeCard";

import { type FunctionComponent, memo, PureComponent, type ReactNode } from "react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis 
} from "recharts";

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

let Chart: FunctionComponent<{ readonly data: UsageTimeData }> = ({ data }) =>
{
  const processedData = data.map(dataPoint => ({
    date: dataPoint.date.toLocaleDateString("de", { weekday: "short" }).toUpperCase(),
    totalUsage: Math.floor(dataPoint.totalUsage / 60) * 60, // round to the nearest minute
  }));

  if(processedData.length <= 2)
  {
    return <p>Invalid date range</p>;
  }

  const biggestUsage = Math.max(...processedData.map(dataPoint => dataPoint.totalUsage));

  let ticksCount: number;

  if(biggestUsage >= 180)
  {
    ticksCount = 4;
  }
  else if(biggestUsage >= 120)
  {
    ticksCount = 3;
  }
  else
  {
    ticksCount = 2;
  }

  type DataPoint = typeof processedData[number];

  return (
    <ResponsiveContainer width="100%" height={180} style={{ fontSize: 14 }}>
      <BarChart
        data={processedData}
        barSize={"8%"}
        margin={{ left: -18, right: 0 }}>
        <CartesianGrid
          strokeDasharray="4"
          vertical={false}
          opacity={1}
        />
        <XAxis
          dataKey={"date" satisfies keyof DataPoint}
          tick={<CustomizedAxisTick/>}
        />
        <YAxis
          scale={"auto"}
          tickFormatter={(seconds) =>
          {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}:${minutes.toString().padStart(2, "0")}h`;
          }}
          allowDecimals={false}
          axisLine={false}
          tickSize={0}
          tickCount={ticksCount}
          tickMargin={4}
        />
        <Bar
          dataKey={"totalUsage" satisfies keyof DataPoint}
          fill="#FF9150"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart = memo(Chart);

export { Chart };
