import { type FunctionComponent } from "react";

export const FolderIcon: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="folder">
      <path id="vector" d="M16.668 4.16667H9.51297L8.09047 2.74417C8.01319 2.66667 7.92135 2.6052 7.82025 2.5633C7.71914 2.5214 7.61075 2.49989 7.5013 2.5H3.33464C2.41547 2.5 1.66797 3.2475 1.66797 4.16667V15.8333C1.66797 16.7525 2.41547 17.5 3.33464 17.5H16.668C17.5871 17.5 18.3346 16.7525 18.3346 15.8333V5.83333C18.3346 4.91417 17.5871 4.16667 16.668 4.16667ZM3.33464 15.8333V5.83333H16.668L16.6696 15.8333H3.33464Z" fill="#949494"/>
    </g>
  </svg>
);
