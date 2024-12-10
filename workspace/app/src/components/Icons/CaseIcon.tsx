import { type FunctionComponent } from "react";

export const CaseIcon: FunctionComponent<{ readonly size?: number }> = ({
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1719 8.83844V6.25781L35.4883 11.2932V39.806L32.946 39.1609"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.2333 37.6792V9.1789M38.2333 9.1789L18.9938 4.01562L16.2461 6.12865M38.2333 9.1789L35.4856 11.2919M35.4856 39.7893L38.2333 37.6763"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.9271 15.5002L10.6875 10.3369V38.8372L29.9271 44.0005V15.5002Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.6747 41.8872V13.3897M32.6747 13.3897L13.4352 8.22647M32.6747 13.3897L29.927 15.5028M10.6875 10.3367L13.4352 8.22363M29.927 43.9974L32.6747 41.8843M26.8958 31.0068L13.1545 27.3175M26.8958 39.5555L13.1545 35.8662M26.8958 28.1554L13.1545 24.4661M26.8958 22.4553L13.1545 18.766M26.8958 19.6039L13.1545 15.9146M26.8958 36.7012L13.1545 33.0119"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

);
