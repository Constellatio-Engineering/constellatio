import { css } from '@emotion/react';
import { MantineTheme } from '@mantine/styles';
import { IIconButtonProps } from './IconButton';

export const wrapper = ({
	theme,
	size,
}: {
	theme: MantineTheme;
	size: IIconButtonProps['size'];
}) => css`
  cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${size === 'big' ? 4 : 0}px;
	padding: ${size === 'big' ? 12 : 8}px;

	width: ${size === 'big' ? 40 : 32}px;
	height: ${size === 'big' ? 40 : 32}px;

	border-radius: 50%;
	border: 1px solid ${theme.colors['neutrals-01'][3]};
	background-color: ${theme.colors['neutrals-01'][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	&:hover {
		border-color: ${theme.colors['neutrals-01'][5]};
		background-color: ${theme.colors['neutrals-01'][2]};
	}

  &:focus {
    border-color: ${theme.colors['neutrals-01'][5]};
    background-color: ${theme.colors['neutrals-01'][3]};
  }

  &:disabled{
    cursor: default;
    border-color: ${theme.colors['neutrals-01'][4]};
    background-color: ${theme.colors['neutrals-01'][4]};
  }
`;

export const icon = ({ size }: { size: IIconButtonProps['size'] }) => css`
	display: flex;
	align-items: center;
	justify-content: center;

	&,
	svg {
		width: ${size === 'big' ? 20 : 16}px;
		height: ${size === 'big' ? 20 : 16}px;
	}
`;
