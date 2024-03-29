import { type FunctionComponent } from "react";

export const Trash: FunctionComponent = ({ size = 20 }: { readonly size?: number | undefined }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="trash">
      <path id="vector" d="M12.5 1.66675H7.5C6.58083 1.66675 5.83333 2.41425 5.83333 3.33341V5.00008H2.5V6.66675H4.16667V16.6667C4.16667 17.5859 4.91417 18.3334 5.83333 18.3334H14.1667C15.0858 18.3334 15.8333 17.5859 15.8333 16.6667V6.66675H17.5V5.00008H14.1667V3.33341C14.1667 2.41425 13.4192 1.66675 12.5 1.66675ZM7.5 3.33341H12.5V5.00008H7.5V3.33341ZM14.1667 16.6667H5.83333V6.66675H14.1667V16.6667Z" fill="currentColor  "/>
    </g>
  </svg>
);
