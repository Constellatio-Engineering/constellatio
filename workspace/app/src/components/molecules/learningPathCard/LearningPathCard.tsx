"use client";

import { useHover } from "@mantine/hooks";
import { Paper, Text, Stack } from "@mantine/core";
import Label from "@/components/atoms/label/Label";
import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { FunctionComponent } from "react";
/* import { CheckCircle2 } from 'lucide-react'; */
// import { Badge } from '@/components/ui/badge'; // Using your existing Badge component

interface LearningPathCardProps {
  title: string;
  icon?: string;
  status?: "completed" | "in-progress" | "upcoming";
  onClick?: () => void;
}

export const LearningPathCard: FunctionComponent<LearningPathCardProps> = ({
  title,
  icon,
  status = "completed",
  onClick,
}) => {
  return (
    <Paper
      /* ref={ref} */
      radius="md"
      p="lg"
      withBorder
      style={{
        cursor: "pointer",
        /* transform: hovered ? "translateY(-2px)" : "none", */
        transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
        backgroundColor: "white",
        minHeight: "320px",
        width: "240px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        position: "relative",
        boxShadow:
          /* hovered
          ? "0 4px 12px rgba(0, 0, 0, 0.05)"
          : */ "0 2px 4px rgba(0, 0, 0, 0.05)",
      }}
      onClick={onClick}
    >
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <Label variant="neutral" title="UNIT" />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #E5E7EB",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="2"
              width="16"
              height="20"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 7H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 17H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Text
          size="xl"
          weight={500}
          style={{ lineHeight: 1.3, textAlign: "center" }}
        >
          {title}
        </Text>
      </div>

      {status === "completed" && (
        <Stack spacing={4} align="center">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* TODO: welche status gibt es? -> müssen neue definiert werden? */}
            <StatusLabel progressState={status} />
          </div>
        </Stack>
      )}
    </Paper>
  );
};
