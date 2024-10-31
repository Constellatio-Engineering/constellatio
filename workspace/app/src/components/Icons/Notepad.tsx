import { type FunctionComponent } from "react";

export const Notepad: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3333 3.33329H15.8333C16.7525 3.33329 17.5 4.08079 17.5 4.99996V16.6666C17.5 17.5858 16.7525 18.3333 15.8333 18.3333H4.16667C3.2475 18.3333 2.5 17.5858 2.5 16.6666V4.99996C2.5 4.08079 3.2475 3.33329 4.16667 3.33329H6.66667V1.66663H8.33333V3.33329H11.6667V1.66663H13.3333V3.33329ZM4.16667 5.83329V16.6666H15.835L15.8333 4.99996V5.83329H4.16667ZM14.1667 7.49996H5.83333V9.16663H14.1667V7.49996ZM10 10.8333H5.83333V12.5H10V10.8333Z"
      fill="currentColor"
    />
  </svg>
);
