import { type FunctionComponent } from "react";

export const MoveDownIcon: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="move-down">
      <path id="vector" d="M4.99932 16.668H14.9993V15.0013H4.99932V16.668ZM5.58849 6.91214L9.16599 10.4896V3.33464H10.8327V10.4896L14.4102 6.91214L15.5885 8.09047L9.99932 13.6796L4.41016 8.09047L5.58849 6.91214Z" fill="currentColor"/>
    </g>
  </svg>
);
