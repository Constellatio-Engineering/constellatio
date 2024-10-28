import { type FunctionComponent } from "react";

export const ArrowRight: FunctionComponent< { readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none">
    <path d="M9 7.41394L13.293 11.7069L9 15.9999L10.414 17.4139L16.121 11.7069L10.414 5.99994L9 7.41394Z" fill="currentColor"/>
  </svg>
);
