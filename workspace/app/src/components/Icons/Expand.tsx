import { type FunctionComponent } from "react";

export const ExpandIcon: FunctionComponent<{readonly size?: number}> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    viewBox="0 -960 960 960"
    height={size}>
    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
  </svg>
);

