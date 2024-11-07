import { ColorSchemeScript } from '@mantine/core';
import ThemeProvider from '@/theme/ThemeProvider';

// Mantine 스타일 임포트
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// 전역 스타일 임포트
import './globals.css';
import { Header } from '@/components/header/Header';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="mx-auto max-w-screen-xl antialiased">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
