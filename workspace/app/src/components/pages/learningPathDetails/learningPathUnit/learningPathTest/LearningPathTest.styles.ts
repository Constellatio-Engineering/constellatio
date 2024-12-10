import { colooors } from "@/constants/styles/colors";
import type { CaseLearningTestProgressState } from "@/hooks/useLearningPathProgress";

import { css } from "@emotion/react";

export const container = (testStatus: CaseLearningTestProgressState) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 12px;
    gap: 16px;
    
    background-color: ${
  testStatus === "completed"
    // ? "#e7f6ea" // Grünlicher Hintergrund
    ? "#ffffff" 
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

export const containerDisabled = css`
  opacity: 0.4;
  pointer-events: none;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  flex: 1;
`;

