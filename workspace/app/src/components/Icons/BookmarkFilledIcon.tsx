import { type FunctionComponent } from "react";

export const BookmarkFilledIcon: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3337 2.68539V14.6667L8.00033 11.5765L2.66699 14.6667V2.68539C2.66699 2.3268 2.82754 1.9829 3.11331 1.72934C3.39908 1.47578 3.78666 1.33333 4.1908 1.33333H11.8098C12.214 1.33333 12.6016 1.47578 12.8873 1.72934C13.1731 1.9829 13.3337 2.3268 13.3337 2.68539Z"
      fill="currentColor"
    />
  </svg>
);
