import { type FunctionComponent } from "react";

export const ExclamationMark: FunctionComponent = ({ size = 20 }: {readonly size?: number}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path id="vector" d="M7.00016 0.333252C3.32416 0.333252 0.333496 3.32392 0.333496 6.99992C0.333496 10.6759 3.32416 13.6666 7.00016 13.6666C10.6762 13.6666 13.6668 10.6759 13.6668 6.99992C13.6668 3.32392 10.6762 0.333252 7.00016 0.333252ZM7.66683 10.3333H6.3335V6.33325H7.66683V10.3333ZM7.66683 4.99992H6.3335V3.66659H7.66683V4.99992Z" fill="#949494"/>
  </svg>
);
