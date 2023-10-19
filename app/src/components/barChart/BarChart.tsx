import React from "react";

import Bar from "./Bar";
import * as styles from "./BarChart.styles";

const BarChart: React.FC = () => 
{
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const yearsData = [3, 0, 6, 2, 5, 8, 0, 0, 10, 1, 0, 1]; // Modify this array based on your data

  // const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  // const daysData = [3, 0, 6, 2, 5, 8, 0]; // Modify this array based on your data

  // Not sure what MonthData will be like.
  return (
    <div css={styles.barChartContainer}>
      {/* <div>RNG</div> */}
      {months.map((month, index) => (
        <div key={month} css={styles.barChartMonth}>
          <Bar height={yearsData[index] ?? 0}/>
          <span>{month}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
