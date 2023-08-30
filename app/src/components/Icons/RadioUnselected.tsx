import React, { type FunctionComponent } from "react";

export const RadioUnselected: FunctionComponent = ({ size = 20 }: { readonly size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M4.1665 10.0001C4.1665 13.2159 6.78317 15.8334 9.99984 15.8334C13.2157 15.8334 15.8332 13.2159 15.8332 10.0001C15.8332 6.78425 13.2157 4.16675 9.99984 4.16675C6.78317 4.16675 4.1665 6.78425 4.1665 10.0001ZM14.1665 10.0001C14.1665 12.2976 12.2973 14.1667 9.99984 14.1667C7.70234 14.1667 5.83317 12.2976 5.83317 10.0001C5.83317 7.70258 7.70234 5.83341 9.99984 5.83341C12.2973 5.83341 14.1665 7.70258 14.1665 10.0001Z"
      fill="currentColor"
    />
  </svg>
);
