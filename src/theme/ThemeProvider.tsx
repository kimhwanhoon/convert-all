'use client';

import { MantineProvider } from '@mantine/core';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'indigo',
      }}
    >
      {children}
    </MantineProvider>
  );
}

export default ThemeProvider;
