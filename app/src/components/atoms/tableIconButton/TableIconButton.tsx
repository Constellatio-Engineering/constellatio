import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';

import * as styles from './TableIconButton.styles';
import IconButton from '../iconButton/IconButton';

export interface ITableIconButtonProps {
	icon: ReactNode;
	onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const TableIconButton: FunctionComponent<ITableIconButtonProps> = ({
	onClickHandler,
	icon,
}) => (
	<div css={styles.wrapper}>
		{icon && <IconButton icon={icon} size="medium" onClick={onClickHandler} />}
	</div>
);

export default TableIconButton;
