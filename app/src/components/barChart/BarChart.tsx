import React from 'react';
import * as styles from './BarChart.styles';
import { useMantineTheme } from '@mantine/styles';

interface BarProps {
  height: number;
}

const Bar: React.FC<BarProps> = ({ height }) => {
  const theme = useMantineTheme()
  return (
  <div
   css={styles.bar({height,theme})}
  ></div>
)};

const BarChart: React.FC = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const yearsData = [3, 0, 6, 2, 5, 8, 0, 0, 10, 1, 0, 1]; // Modify this array based on your data

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const daysData = [3, 0, 6, 2, 5, 8, 0]; // Modify this array based on your data

  // Not sure what MonthData will be like.
  return (
    <div css={styles.barChartContainer}>
      {/* <div>RNG</div> */}
      {months.map((month, index) => (
        <div key={month} css={styles.barChartMonth}>
          <Bar height={yearsData[index] ?? 0} />
          <span>{month}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;