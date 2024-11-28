import { type FunctionComponent } from "react";

export const Check: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="check">
      <path
        id="vector"
        d="M8.33314 12.9883L5.58898 10.2442L4.41064 11.4225L8.33314 15.345L16.4223 7.25585L15.244 6.07751L8.33314 12.9883Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
