import { type FunctionComponent } from "react";

type Props = {
  readonly color?: string;
  readonly size?: number | undefined;
};

export const Timer: FunctionComponent<Props> = ({ color = "#ffffff", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="timer">
      <path
        id="vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3333 2H8.66659V3.33333H11.3333V2ZM4.66659 5.33333H1.99992V6.66667H4.66659V5.33333ZM10.6666 6.66667H9.33325V9.33333H10.6666V6.66667ZM4.66659 10.6667H1.99992V12H4.66659V10.6667ZM3.99325 8H1.33325V9.33333H3.99325V8ZM14.4719 4.47131L13.4299 5.51331C14.2244 6.37125 14.6661 7.49733 14.6666 8.66665C14.6666 11.24 12.5726 13.3333 9.99992 13.3333C7.42725 13.3333 5.33325 11.24 5.33325 8.66665C5.33325 6.09331 7.42725 3.99998 9.99992 3.99998C10.8746 3.99998 11.6906 4.24665 12.3906 4.66665L13.5293 3.52865L14.4719 4.47131ZM6.66659 8.66665C6.66659 10.5046 8.16192 12 9.99992 12C11.8379 12 13.3333 10.5046 13.3333 8.66665C13.3333 6.82865 11.8379 5.33331 9.99992 5.33331C8.16192 5.33331 6.66659 6.82865 6.66659 8.66665Z"
        fill={color}
      />
    </g>
  </svg>
);
