import { type UsageTimeData } from "@/components/organisms/learninTimeCard/LearningTimeCard";
import { convertSecondsToDuration } from "@/utils/dates";

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
    totalUsage: dataPoint.totalUsage
  }));

  if(processedData.length <= 2)
  {
    return <p>Invalid date range</p>;
  }

  type DataPoint = typeof processedData[number];

  return (
    <ResponsiveContainer width="100%" height={180} style={{ fontSize: 14 }}>
      <BarChart
        data={processedData}
        barSize={"7%"}
        margin={{ left: -25, right: 4 }}>
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
            else
            {
              return seconds === 0 ? "0" : `${seconds}s`;
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

Chart = memo(Chart);

export { Chart };
