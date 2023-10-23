import { type FunctionComponent } from "react";

export const ArrowLeftWithLine: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="Style=outlined">
      <path id="vector" d="M12.7071 17.293L8.41406 13H18.0001V11H8.41406L12.7071 6.70697L11.2931 5.29297L4.58606 12L11.2931 18.707L12.7071 17.293Z" fill="currentColor"/>
    </g>
  </svg>
);
