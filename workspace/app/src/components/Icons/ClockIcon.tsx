import { type FunctionComponent } from "react";

export const ClockIcon: FunctionComponent = ({ size = 16 }: {readonly size?: number}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.33301 7.99992C1.33301 4.32392 4.32367 1.33325 7.99967 1.33325C11.6757 1.33325 14.6663 4.32392 14.6663 7.99992C14.6663 11.6759 11.6757 14.6666 7.99967 14.6666C4.32367 14.6666 1.33301 11.6759 1.33301 7.99992ZM2.66634 7.99992C2.66634 10.9406 5.05901 13.3333 7.99967 13.3333C10.9403 13.3333 13.333 10.9406 13.333 7.99992C13.333 5.05925 10.9403 2.66659 7.99967 2.66659C5.05901 2.66659 2.66634 5.05925 2.66634 7.99992ZM7.33301 8.66659V4.66658H8.66634V7.33325H11.333V8.66659H7.33301Z"
      fill="currentColor"
    />
  </svg>
);
