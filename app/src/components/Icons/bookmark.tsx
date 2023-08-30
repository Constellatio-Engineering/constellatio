import { type FunctionComponent } from "react";

export const Bookmark: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="bookmark">
      <path id="vector" d="M14.9997 1.66666H4.99967C4.08051 1.66666 3.33301 2.41416 3.33301 3.33332V18.3333L9.99967 14.5233L16.6663 18.3333V3.33332C16.6663 2.41416 15.9188 1.66666 14.9997 1.66666ZM14.9997 15.4608L9.99967 12.6042L4.99967 15.4608V3.33332H14.9997V15.4608Z" fill="black"/>
    </g>
  </svg>
);
