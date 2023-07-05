import { MantineProvider } from '@mantine/core';
import React, { ReactNode } from 'react';

const CustomThemingProvider = ({ children }: { children: ReactNode }) => (
	<MantineProvider
		withGlobalStyles
		withNormalizeCSS
		theme={{
			colorScheme: 'light',
			fontFamily: 'Karla, sans-serif',
			headings: {
				fontFamily: 'Libre Baskerville, serif',
				fontWeight: 700,
			},
		}}
	>
		{children}
	</MantineProvider>
);

export default CustomThemingProvider;
