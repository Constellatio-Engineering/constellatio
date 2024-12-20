import { type FunctionComponent } from "react";

export const ArticleIcon: FunctionComponent<{
  readonly size?: number;
  readonly strokeWidth?: number;
}> = ({ size = 20, strokeWidth = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1568_12657)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.999 14.1538L11 8.57031V39.3869L31.999 44.9703V14.1538Z"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.999 40.4031V9.58347L17 4"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.9994 8.67697L16.9984 7.08301L13.9994 9.36492L13.9375 18.5939L17.0634 16.6406L20.0623 20.2247L20.0004 10.962L22.9994 8.67697Z"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.999 14.1534L38 9.58347M11 8.56997L16.9979 4M31.9959 44.97L37.9969 40.4"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.4736 36.868L14.3047 34.9629V37.1015L21.4736 39.0096V36.868Z"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.3057 35.0792L14.3047 31.0928V33.2314L29.3057 37.2209V35.0792Z"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6406 6.72168L33.4364 11.4544M34.9455 14.7928V39.4485"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1568_12657">
        <rect
          width="42.6667"
          height="42.6667"
          fill="white"
          transform="translate(3 3)"
        />
      </clipPath>
    </defs>
  </svg>
);

