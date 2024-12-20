import { type FunctionComponent } from "react";

export const Quote: FunctionComponent<{readonly size?: number}> = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M18.2433 7.06637L18.2225 6.93545L18.2009 6.94013C18.0532 6.29257 17.7131 5.69746 17.2199 5.22364C16.7267 4.74982 16.1005 4.41667 15.4139 4.26273C14.7272 4.10879 14.0081 4.14035 13.3397 4.35377C12.6714 4.56718 12.0811 4.95373 11.6372 5.46868C11.1934 5.98363 10.914 6.60593 10.8315 7.26359C10.749 7.92125 10.8667 8.58738 11.171 9.18491C11.4753 9.78244 11.9538 10.2869 12.551 10.6401C13.1483 10.9932 13.8399 11.1804 14.546 11.1802C14.7312 11.1802 14.909 11.1537 15.086 11.1296C15.0287 11.3104 14.9697 11.4943 14.875 11.6595C14.7803 11.8995 14.6324 12.1076 14.4853 12.3172C14.3623 12.544 14.1455 12.6975 13.986 12.8915C13.819 13.0801 13.5913 13.2056 13.411 13.3622C13.234 13.5259 13.0022 13.6077 12.8178 13.723C12.625 13.8267 12.4572 13.9412 12.2777 13.9958L11.8299 14.1688L11.4361 14.3223L11.8382 15.8333L12.3342 15.7211C12.4929 15.6837 12.6865 15.6401 12.9067 15.5878C13.1319 15.5489 13.372 15.4421 13.6395 15.3447C13.9029 15.2333 14.2095 15.1592 14.4936 14.9808C14.7794 14.8109 15.1093 14.6691 15.4001 14.4415C15.6817 14.207 16.0216 14.0036 16.2725 13.7059C16.5467 13.4269 16.8175 13.1339 17.0277 12.8003C17.2712 12.4824 17.4365 12.1333 17.611 11.7881C17.7688 11.4428 17.896 11.0898 17.9998 10.7469C18.1967 10.0596 18.2848 9.40656 18.3189 8.84782C18.3471 8.28829 18.3305 7.82306 18.2956 7.48641C18.2839 7.34582 18.2665 7.2057 18.2433 7.06637ZM9.10388 7.06637L9.08311 6.93545L9.06151 6.94013C8.91388 6.29257 8.57377 5.69746 8.08056 5.22364C7.58734 4.74982 6.96117 4.41667 6.2745 4.26273C5.58783 4.10879 4.86872 4.14035 4.20037 4.35377C3.53202 4.56718 2.94176 4.95373 2.49788 5.46868C2.054 5.98363 1.77464 6.60593 1.69213 7.26359C1.60961 7.92125 1.72732 8.58738 2.03162 9.18491C2.33593 9.78244 2.81439 10.2869 3.41166 10.6401C4.00892 10.9932 4.70058 11.1804 5.40659 11.1802C5.59188 11.1802 5.76968 11.1537 5.94665 11.1296C5.88932 11.3104 5.83033 11.4943 5.73561 11.6595C5.6409 11.8995 5.493 12.1076 5.34594 12.3172C5.22298 12.544 5.00612 12.6975 4.8466 12.8915C4.6796 13.0801 4.45195 13.2056 4.27165 13.3622C4.09468 13.5259 3.86287 13.6077 3.67842 13.723C3.48567 13.8267 3.31783 13.9412 3.13837 13.9958L2.69054 14.1688C2.44046 14.2646 2.29755 14.3207 2.29755 14.3207L2.69968 15.8318L3.1957 15.7195C3.35439 15.6821 3.54798 15.6385 3.76816 15.5863C3.99332 15.5473 4.23343 15.4406 4.50097 15.3432C4.76435 15.2317 5.07093 15.1577 5.35508 14.9792C5.6409 14.8093 5.97074 14.6675 6.26154 14.44C6.5432 14.2054 6.88302 14.002 7.13394 13.7043C7.40812 13.4253 7.67897 13.1323 7.88918 12.7988C8.13262 12.4808 8.29796 12.1317 8.47244 11.7865C8.6303 11.4413 8.75742 11.0883 8.86128 10.7454C9.05819 10.058 9.14626 9.40501 9.18032 8.84626C9.20857 8.28673 9.19196 7.8215 9.15706 7.48485C9.14465 7.34481 9.12692 7.20523 9.10388 7.06637Z"
      fill="currentColor"
    />
  </svg>
);
