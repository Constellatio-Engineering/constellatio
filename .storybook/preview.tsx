import type { Preview } from '@storybook/react';
import React from 'react';
import { MantineProvider } from '@mantine/core';

const customViewports = {
	Bronze: {
		name: 'Bronze',
		styles: {
			width: '640px',
			height: '100%',
		},
	},
	Silver: {
		name: 'Silver',
		styles: {
			width: '768px',
			height: '100%',
		},
	},
	Gold: {
		name: 'Gold',
		styles: {
			width: '1280px',
			height: '100%',
		},
	},
	Platinum: {
		name: 'Platinum',
		styles: {
			width: '1440px',
			height: '100%',
		},
	},
	Diamond: {
		name: 'Diamond',
		styles: {
			width: '1920px',
			height: '100%',
		},
	},
	iphoneX: {
		name: 'iPhone X',
		styles: {
			width: '375px',
			height: '812px',
		},
	},
	ipad: {
		name: 'iPad',
		styles: {
			width: '768px',
			height: '1024px',
		},
	},
	ipadMini: {
		name: 'iPad landscape',
		styles: {
			width: '1024px',
			height: '768px',
		},
	},
	pixel: {
		name: 'Google Pixel',
		styles: {
			width: '412px',
			height: '732px',
		},
	},
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		viewport: { viewports: customViewports, defaultViewport: 'Gold' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(Story) => {
			return (
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ colorScheme: 'light' }}
				>
					<Story />
				</MantineProvider>
			);
		},
	],
};

export default preview;
