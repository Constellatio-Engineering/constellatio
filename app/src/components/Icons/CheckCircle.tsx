import { type FunctionComponent } from "react";

export const CheckCircle: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="check-circle">
      <path
        id="vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12ZM4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4C7.589 4 4 7.589 4 12ZM7.70002 11.292L9.99902 13.587L15.293 8.29297L16.707 9.70697L10.001 16.413L6.28802 12.708L7.70002 11.292Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
