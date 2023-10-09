import { type FunctionComponent } from "react";

export const Edit: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="edit">
      <path id="vector" d="M15.8708 6.16764C16.1858 5.85264 16.3592 5.43431 16.3592 4.98931C16.3592 4.54431 16.1858 4.12598 15.8708 3.81098L14.5492 2.48931C14.2342 2.17431 13.8158 2.00098 13.3708 2.00098C12.9258 2.00098 12.5075 2.17431 12.1933 2.48848L3.33334 11.321V15.0001H7.01084L15.8708 6.16764ZM13.3708 3.66764L14.6933 4.98848L13.3683 6.30848L12.0467 4.98764L13.3708 3.66764ZM5.00001 13.3335V12.0126L10.8667 6.16431L12.1883 7.48598L6.32251 13.3335H5.00001ZM3.33334 16.6668H16.6667V18.3335H3.33334V16.6668Z" fill="currentColorw"/>
    </g>
  </svg>
);
