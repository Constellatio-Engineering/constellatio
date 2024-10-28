import { type FunctionComponent } from "react";

export const ArrowRightWithLine: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="arrow-right">
      <path id="vector" d="M7.52867 11.5288L8.47133 12.4715L12.9427 8.00014L8.47133 3.52881L7.52867 4.47148L10.3907 7.33348H4V8.66681H10.3907L7.52867 11.5288Z" fill="currentColor"/>
    </g>
  </svg>
);
