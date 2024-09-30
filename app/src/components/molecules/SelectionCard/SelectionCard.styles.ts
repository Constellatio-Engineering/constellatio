import styled from "@emotion/styled";

export const ResultWrapper = styled.div<{ status: "default" | "success" | "error" }>`
display: ${({ status }) => (status === "default" ? "none" : "flex")};
color: ${colooors["neutrals-01"][7]};
align-items: center;
gap: ${spaciiing["spacing-8"]};
`;
