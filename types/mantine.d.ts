import { Tuple, MantineSizes } from '@mantine/core';

type ExtendedCustomColors =
	| 'neutrals-01'
	| 'neutrals-02'
	| 'brand-01'
	| 'brand-02'
	| 'cc-cases'
	| 'cc-dictionary'
	| 'cc-forum'
	| 'support-success'
	| 'support-warning'
	| 'support-error'
	| 'support-notice'
	| 'transparency-01'
	| 'transparency-02'
	| 'transparency-03'
	| (string & {});
// you can replace " (string & {}) " with " DefaultMantineColor " to show maintine default colors in autocomplete


declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}

}
