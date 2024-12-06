import { type testStatusType } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";
import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  gap: 30px;
`;

export const visualPathWrapper = css`
  min-width: max-content;
  position: relative;
`;

export const iconWrapperCompleted = css`
  transform: translateX(5px);
`;

export const connectingLine = (isColoured: boolean) => css`
  position: absolute;
  left: 50%;
  top: 60px;
  height: 100%;
  width: 5px;
  background-color: ${isColoured ? "#E58180" : "#E8E8E8"};
  transform: translateX(-50%);
  z-index: -1;
`;

export const unit = css`
  flex: 1;
  min-width: 0;
`;

export const unitTitle = css`
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 8px;
`;

export const unitCompletedCount = css`
  font-weight: 500;
  color: #949494;
  font-size: 18px;
`;

export const unitContentPieces = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 24px 0;
`;

export const testList = css`
  list-style: none;
`;

export const container = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background-color: ${colooors["neutrals-01"][2]};
  gap: 16px;
`;

export const container2 = (testStatus: testStatusType) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 12px;
    gap: 16px;
    
    background-color: ${
  testStatus === "completed"
    ? "#e7f6ea" // Grünlicher Hintergrund
    : testStatus === "in-progress"
      ? "#edeefa" // Bläulicher Hintergrund
      : colooors["neutrals-01"][2] // Fallback
};

    border: 1px solid ${
  testStatus === "completed"
    ? "#26b961" // Grüne Border
    : testStatus === "in-progress"
      ? "#9fafe1" // Blaue Border
      : "#e0e0e0" // Fallback
};

    opacity: ${
  testStatus === "upcoming" ? 0.5 : 1 // Disabled Look durch reduzierte Opazität
};

    transition: all 0.3s ease-in-out; // Für sanfte Animationen beim Statuswechsel
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  flex: 1;
`;
