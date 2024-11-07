'use client';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';

const themeConfig: MantineThemeOverride = {
  primaryColor: 'indigo',
  cursorType: 'pointer',
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={themeConfig}>{children}</MantineProvider>;
}

export default ThemeProvider;
