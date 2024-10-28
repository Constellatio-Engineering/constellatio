import React, { type FunctionComponent } from "react";

export const InfoFilled: FunctionComponent<{readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M10.0003 1.66675C5.40533 1.66675 1.66699 5.40508 1.66699 10.0001C1.66699 14.5951 5.40533 18.3334 10.0003 18.3334C14.5953 18.3334 18.3337 14.5951 18.3337 10.0001C18.3337 5.40508 14.5953 1.66675 10.0003 1.66675ZM10.8337 14.1667H9.16699V9.16675H10.8337V14.1667ZM10.8337 7.50008H9.16699V5.83342H10.8337V7.50008Z"
      fill="currentColor"
    />
  </svg>
);
