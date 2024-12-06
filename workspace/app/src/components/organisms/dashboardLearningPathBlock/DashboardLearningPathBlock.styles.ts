import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 60px 32px 48px 32px;
  border-radius: 12px;
  border-top: 12px solid #F0B3B2;
  border-color: #eed4d4;
  border-left: 1px solid #eed4d4;
  border-right: 1px solid #eed4d4;
  border-bottom: 1px solid #eed4d4; 
  position: relative;
  transform: scale(.9);
  margin: -20px 0;
`;

export const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.03);
  gap: 12px;
  padding-bottom: 20px;
  h2 {
    font-size: 33px;
  }
`;

export const labelWrapper = css`
  transform: scale(1.1);
  transform-origin: bottom;
`;

export const comingSoon = css`
  text-transform: uppercase;
  color: #949494;
  font-size: 20px;
`;

export const innerWrapper = css`
  max-width: 100%;
  width: 100%;
  display: flex;
  gap: 50px;
  filter: blur(8px) grayscale(.5);
  opacity: .15;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const carouselWrapper = css`
  display: flex; 
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

export const countdownWrapper = css`

  margin-top: 6px;
  transform: scale(.92);

  .timer-units {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.5rem;
  }

  .time-unit-value {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .time-unit-number {
    font-size: 2rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.9);
  }

  .time-unit-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #949494;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;
