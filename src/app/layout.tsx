import { ThemeProvider } from '@/contexts';
import { Header } from '@/components';

import { type Metadata } from 'next';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Beloved Dogs',
  description: 'Your best application for finding your beloved dogs',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <div id="root">
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
