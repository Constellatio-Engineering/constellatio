import { type FunctionComponent } from "react";

export const FiltersList: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    fill="#5f6368">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
);
