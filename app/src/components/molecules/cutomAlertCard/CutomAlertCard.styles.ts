import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

import { type CutomAlertCardProps } from "./CutomAlertCard";

export const wrapper = ({ variant }: { variant: CutomAlertCardProps["variant"]}) => css`
    color: ${variant === "error" ? colooors["support-error"][3] : colooors["support-success"][3]};
    background-color: ${variant === "error" ? colooors["support-error"][0] : colooors["support-success"][0]};
    border-radius: 12px;
    padding: 16px 20px;
    p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 12px;
    }
`;
