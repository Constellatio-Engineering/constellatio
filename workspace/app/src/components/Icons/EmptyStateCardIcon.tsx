import { type FunctionComponent } from "react";

export const EmptyStateCardIcon: FunctionComponent<{readonly size?: number}> = ({ size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31.24 80V116L93.59 152M93.59 152V94.4M93.59 152L149.71 119.6V83.6M93.59 94.4L149.71 62M93.59 94.4L99.83 112.4L155.95 80L149.71 62M93.59 94.4L31.24 58.4M93.59 94.4L87.35 112.4L25 76.4L31.24 58.4M149.71 62L87.36 26M87.36 26V54.8M87.36 26L31.24 58.4M87.36 54.8L124.77 76.4M87.36 54.8L56.18 72.8"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
