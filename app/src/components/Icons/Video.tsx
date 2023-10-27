import { type FunctionComponent } from "react";

export const VideoIcon: FunctionComponent<{ readonly size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="video">
      <path
        id="vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33464 2.5H16.668C17.5871 2.5 18.3346 3.2475 18.3346 4.16667V15.8333C18.3346 16.7525 17.5871 17.5 16.668 17.5H3.33464C2.41547 17.5 1.66797 16.7525 1.66797 15.8333V4.16667C1.66797 3.2475 2.41547 2.5 3.33464 2.5ZM16.2813 7.5H16.6688L16.668 4.16667H14.0588L16.2813 7.5ZM5.72547 4.16667L7.94797 7.5H10.1113L7.8888 4.16667H5.72547ZM9.89214 4.16667L12.1146 7.5H14.278L12.0555 4.16667H9.89214ZM3.72214 4.16667H3.33464V7.5H5.94464L3.72214 4.16667ZM3.33464 9.16667V15.8333H16.6696L16.668 9.16667H3.33464ZM12.918 12.5L8.33464 15V10L12.918 12.5Z"
        fill="black"
      />
    </g>
  </svg>
);
