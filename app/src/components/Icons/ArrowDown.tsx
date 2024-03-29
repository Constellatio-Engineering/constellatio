import { type FunctionComponent } from "react";

export const ArrowDown: FunctionComponent< { readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5775 7.74414L9.99997 11.3216L6.42247 7.74414L5.24414 8.92247L9.99997 13.6783L14.7558 8.92247L13.5775 7.74414Z"
      fill="currentColor"
    />
  </svg>
);
