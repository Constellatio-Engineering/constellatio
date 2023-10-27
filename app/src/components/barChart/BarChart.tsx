import React, { type FunctionComponent } from "react";

import Bar from "./Bar";
import * as styles from "./BarChart.styles";
import { CaptionText } from "../atoms/CaptionText/CaptionText";

const BarChart: FunctionComponent<{readonly chartType: "months" | "days"}> = ({ chartType }) => 
{
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const monthsData = [3, 0, 6, 2, 5, 8, 0, 12, 10, 1, 0, 1]; // Modify this array based on your data based on container height the max of any bar is 12

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const daysData = [3, 0, 6, 2, 12, 8, 0]; // Modify this array based on your data... based on container height the max of any bar is 12

  // Not sure what MonthData will be like.
  return (
    <div css={styles.barChartContainer}>
      {/* <div>RNG</div> */}
      {chartType === "days" && days.map((day, index) => (
        <div key={day} css={styles.barChartMonth}>
          <Bar height={daysData[index] ?? 0}/>
          <CaptionText styleType="caption-01-medium" component="p">{day}</CaptionText>
        </div>
      ))}
      {chartType === "months" && months.map((month, index) => (
        <div key={month} css={styles.barChartMonth}>
          <Bar height={monthsData[index] ?? 0}/>
          <CaptionText styleType="caption-01-medium" component="p">{month}</CaptionText>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
