import styled from "@emotion/styled";

export const SFooter = styled.footer<{ variant?: "default" | "simpleColoredBg" | "simpleWhiteBg" }>`
  max-height: 72px;
  padding: 24px 0;
  position: relative;
  bottom: 0;
  width: calc(100% - 120px); /* to ensure minimum 60px margin on each side */
  max-width: 1440px;
  margin: 0 auto;
`;
