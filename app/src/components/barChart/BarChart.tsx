import React, { type FunctionComponent } from "react";

import Bar from "./Bar";
import * as styles from "./BarChart.styles";
import { CaptionText } from "../atoms/CaptionText/CaptionText";

const BarChart: FunctionComponent<{readonly chartType: "months" | "days"}> = ({ chartType }) => 
{
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const monthsData = [3, 0, 6, 2, 5, 6, 0, 12, 10, 1, 0, 3]; // Modify this array based on your data based on container height the max of any bar is 12

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const daysData = [3, 0, 6, 2, 12, 8, 0]; // Modify this array based on your data... based on container height the max of any bar is 12

  const heighestValue = 12;
  const lowestValue = 0;
  // Not sure what MonthData will be like.
  return (
    <div css={styles.barChartContainer}>
      <div css={styles.yAxis}>
        <span className="heighestValueLine"/>
        <CaptionText styleType="caption-01-medium" component="p">{lowestValue}H</CaptionText>
        <CaptionText styleType="caption-01-medium" component="p">{heighestValue / 2}H</CaptionText>
        <CaptionText styleType="caption-01-medium" component="p">{heighestValue}H</CaptionText>
      </div>
      {chartType === "days" && days.map((day, index) => (
        <div key={day} css={styles.barChartMonth}>
          <Bar height={Math.max(lowestValue, Math.min(heighestValue, daysData?.[index] || lowestValue))}/>
          <CaptionText styleType="caption-01-medium" component="p">{day}</CaptionText>
        </div>
      ))}
      {chartType === "months" && months.map((month, index) => (
        <div key={month} css={styles.barChartMonth}>
          <Bar height={Math.max(lowestValue, Math.min(heighestValue, monthsData?.[index] || lowestValue))}/>
          <CaptionText styleType="caption-01-medium" component="p">{month}</CaptionText>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
