import React from "react";

export const Plus = ({ size = 20 }: { readonly size?: number }): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M15.8332 9.16669H10.8332V4.16669H9.1665V9.16669H4.1665V10.8334H9.1665V15.8334H10.8332V10.8334H15.8332V9.16669Z"
      fill="currentColor"
    />
  </svg>
);
