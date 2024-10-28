import React, { type FunctionComponent } from "react";

export const Handle: FunctionComponent = ({ size = 20 }: { readonly size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M6.66675 5H13.3334V6.66667H6.66675V5ZM6.66675 9.16667H13.3334V10.8333H6.66675V9.16667ZM6.66675 13.3333H13.3334V15H6.66675V13.3333Z"
      fill="currentColor"
    />
  </svg>
);
