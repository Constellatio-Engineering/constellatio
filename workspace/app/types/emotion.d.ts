import '@emotion/react';
import type { MantineTheme } from '@mantine/core';
import {} from 'react'
import { Interpolation } from '@emotion/serialize'
import { Theme } from '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends MantineTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>
  }
}
