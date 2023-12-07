import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const SRichtext = styled.div<{ stylesOverwrite?: SerializedStyles }>`
  ${({ theme }) => css`

    > *:not(:not(:last-child) ~ *) {
      padding-top: 0 !important;
    }
    
    > p,
    > ul p,
    > ol p {
      font-size: ${theme.fontSizes["spacing-16"]};
      font-weight: 400;
      line-height: ${theme.spacing["spacing-24"]};
      padding-bottom: ${theme.spacing["spacing-24"]};

      strong {
        font-weight: 700;
      }

      a {
        color: ${theme.colors["neutrals-02"][2]};
        text-decoration: underline;
        font-size: ${theme.fontSizes["spacing-16"]};
        font-weight: inherit;
        font-family: inherit;
        line-height: ${theme.spacing["spacing-24"]};
        transition: color 0.3 ease;

        &:hover {
          color: ${theme.colors["neutrals-02"][1]};
        }
      }
    }

    ul {
      padding-bottom: 24px;
      li {
        display: flex;
        align-items: baseline;
        gap: ${theme.spacing["spacing-8"]};

        &::before {
          content: "";
          background-color: ${theme.colors["neutrals-02"][1]};
          width: 5px;
          min-width: 5px;
          height: 5px;
          min-height: 5px;
          border-radius: 50%;
        }
      }
    }

    ol {
      list-style-type: decimal;
      li {
        transform: translateX(15px);
      }
    }

    ul,
    ol {
      li {
        p {
          padding-bottom: 0;
        }
      }
    }

    > h5 {
      font-size: ${theme.fontSizes["spacing-18"]};
      font-weight: 500;
      line-height: ${theme.spacing["spacing-24"]};
      padding-bottom: ${theme.spacing["spacing-24"]};

      strong {
        font-weight: 700;
      }
    }

    > h6 {
      font-size: ${theme.fontSizes["spacing-16"]};
      font-weight: 500;
      line-height: ${theme.spacing["spacing-24"]};
      padding-bottom: ${theme.spacing["spacing-24"]};

      strong {
        font-weight: 700;
      }
    }
  `}

  > h1, > h2, > h3, > h4 {
    font-family: ${({ theme }) => theme.headings.fontFamily};
    padding-bottom: ${({ theme }) => theme.spacing["spacing-24"]};

    strong {
      font-weight: 700;
    }
  }
  
  > h1, > h2 {
    padding-top: 50px;
}
  
  > h3 {
    padding-top: 30px;
  }
  
  > h4 {
    padding-top: 20px;
  }
  

  > h2 {
    ${({ theme }) => ({ ...theme.headings.sizes.h2 })}
  }

  > h3 {
    ${({ theme }) => ({ ...theme.headings.sizes.h3 })}
    line-height: ${({ theme }) => theme.spacing["spacing-32"]};
  }

  > h4 {
    ${({ theme }) => ({ ...theme.headings.sizes.h4 })}
  }

  ${({ stylesOverwrite }) => stylesOverwrite ?? ""};
`;
