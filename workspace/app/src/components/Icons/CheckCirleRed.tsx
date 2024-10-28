import { type FunctionComponent } from "react";

export const CheckCircleRed: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="check-circle">
      <path id="vector" d="M8.66667 1.33331C4.99067 1.33331 2 4.32398 2 7.99998C2 11.676 4.99067 14.6666 8.66667 14.6666C12.3427 14.6666 15.3333 11.676 15.3333 7.99998C15.3333 4.32398 12.3427 1.33331 8.66667 1.33331ZM7.334 10.942L4.85867 8.47198L5.8 7.52798L7.33267 9.05798L10.862 5.52865L11.8047 6.47131L7.334 10.942Z" fill="#A90000"/>
    </g>
  </svg>
);
