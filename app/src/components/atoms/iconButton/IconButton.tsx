import {
	ButtonHTMLAttributes,
	ForwardRefRenderFunction,
	ReactNode,
	forwardRef,
} from 'react';

import * as styles from './IconButton.styles';
import { useMantineTheme } from '@mantine/styles';

export interface IIconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	size: 'big' | 'medium';
	icon: ReactNode;
}

const _IconButton: ForwardRefRenderFunction<
	HTMLButtonElement,
	IIconButtonProps
> = ({ size, icon, ...props }, ref) => {
	const theme = useMantineTheme();

	return (
		<button
			ref={ref}
			type="button"
			css={styles.wrapper({ size, theme })}
			{...props}
		>
			{icon && <span css={styles.icon({ size })}>{icon}</span>}
		</button>
	);
};

const IconButton = forwardRef(_IconButton);

export default IconButton;
