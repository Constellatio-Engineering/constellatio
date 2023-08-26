import React, { type FunctionComponent } from "react";

export const NotepadFilled: FunctionComponent = ({ size = 20 }: { readonly size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M15.8333 3.33329H13.3333V1.66663H11.6667V3.33329H8.33333V1.66663H6.66667V3.33329H4.16667C3.2475 3.33329 2.5 4.08079 2.5 4.99996V16.6666C2.5 17.5858 3.2475 18.3333 4.16667 18.3333H15.8333C16.7525 18.3333 17.5 17.5858 17.5 16.6666V4.99996C17.5 4.08079 16.7525 3.33329 15.8333 3.33329ZM10 11.6666H5.83333V9.99996H10V11.6666ZM14.1667 8.33329H5.83333V6.66663H14.1667V8.33329Z"
      fill="currentColor"
    />
  </svg>
);
