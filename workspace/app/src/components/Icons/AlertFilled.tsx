import { type FunctionComponent } from "react";

export const AlertFilled: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="alert">
      <path
        id="vector"
        d="M10.7368 2.10992C10.4485 1.56492 9.55179 1.56492 9.26346 2.10992L1.76346 16.2766C1.69595 16.4036 1.66248 16.5459 1.66631 16.6896C1.67015 16.8334 1.71115 16.9737 1.78534 17.0969C1.85953 17.2201 1.96436 17.322 2.08963 17.3926C2.21489 17.4632 2.35632 17.5002 2.50013 17.4999H17.5001C17.6438 17.5002 17.7852 17.4633 17.9104 17.3927C18.0355 17.3221 18.1403 17.2203 18.2144 17.0971C18.2885 16.974 18.3295 16.8338 18.3332 16.6901C18.337 16.5465 18.3035 16.4043 18.236 16.2774L10.7368 2.10992ZM10.8335 14.9999H9.16679V13.3333H10.8335V14.9999ZM9.16679 11.6666V7.49992H10.8335L10.8343 11.6666H9.16679Z"
        fill="currentColor"
      />
    </g>
  </svg>
);