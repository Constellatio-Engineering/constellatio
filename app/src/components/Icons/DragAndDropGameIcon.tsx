import { type FunctionComponent } from "react";

export const DragAndDropGameIcon: FunctionComponent<{readonly size?: number}> = ({ size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M83.35 153.07L21 117.07V102.67M83.35 153.07L158.17 109.87M83.35 153.07V138.67M158.18 95.47V109.87M63.88 77.9L61.47 79.31L21 102.68L83.35 138.68L158.17 95.48L104.07 64.24M78.34 27L103.8 41.7V89.54L116.75 97.26L110.34 99.85M65.61 67.49L72.11 71.24M97.57 92.48L103.7 89.53M97.57 44.66L103.7 41.64M72.11 29.96L78.37 27.02M59.38 70.43L65.62 67.54M97.56 92.49L110.29 99.84L84.83 110.6L59.37 70.45L72.1 77.8V29.96L97.55 44.66V92.49H97.56Z"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
