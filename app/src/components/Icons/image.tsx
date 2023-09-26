import { type FunctionComponent } from "react";

export const ImageIcon: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="image">
      <path
        id="vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.16667 2.5H15.8333C16.7525 2.5 17.5 3.2475 17.5 4.16667V15.8333C17.5 16.7525 16.7525 17.5 15.8333 17.5H4.16667C3.2475 17.5 2.5 16.7525 2.5 15.8333V4.16667C2.5 3.2475 3.2475 2.5 4.16667 2.5ZM4.16667 4.16667V15.8333H15.835L15.8333 4.16667H4.16667ZM7.5 10.8333L8.33333 11.6667L10.8333 8.33333L15 14.1667H5L7.5 10.8333Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
 
