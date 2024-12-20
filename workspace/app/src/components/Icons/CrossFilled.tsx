import { type FunctionComponent } from "react";

export const CrossFilled: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M9.99984 1.66675C5.40484 1.66675 1.6665 5.40508 1.6665 10.0001C1.6665 14.5951 5.40484 18.3334 9.99984 18.3334C14.5948 18.3334 18.3332 14.5951 18.3332 10.0001C18.3332 5.40508 14.5948 1.66675 9.99984 1.66675ZM13.5057 12.3276L12.3273 13.5059L9.99984 11.1784L7.67234 13.5059L6.494 12.3276L8.8215 10.0001L6.494 7.67258L7.67234 6.49425L9.99984 8.82175L12.3273 6.49425L13.5057 7.67258L11.1782 10.0001L13.5057 12.3276Z"
      fill="currentColor"
    />
  </svg>
);
