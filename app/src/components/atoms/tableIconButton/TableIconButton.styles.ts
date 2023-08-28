import { css } from '@emotion/react';
import { MantineTheme } from '@mantine/styles';

export const wrapper = (theme: MantineTheme) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	padding: 0 16px;
	gap: 8px;

	border-bottom: 1px solid ${theme.colors['neutrals-01'][3]};
	background-color: ${theme.colors['neutrals-01'][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	&:hover {
		border-color: ${theme.colors['neutrals-01'][4]};
		background-color: ${theme.colors['neutrals-01'][1]};
	}

	&:active {
		border-color: ${theme.colors['neutrals-01'][3]};
		background-color: ${theme.colors['neutrals-01'][2]};
	}

  &:focus-within{
    border-color: ${theme.colors['neutrals-01'][4]};
    background-color: ${theme.colors['neutrals-01'][1]};
  }
`;
