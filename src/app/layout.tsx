import type { Metadata } from 'next';
import './globals.scss';
import TopNav from '@/components/layout/TopNav';
import NavigationLoader from '@/components/layout/NavigationLoader';
import CommandPalette from '@/components/CommandPalette';
import { instrumentSerif, plexSans, jetbrainsMono } from './fonts';

export const metadata: Metadata = {
  title: 'Frontend Interview Prep',
  description: 'Master JavaScript, HTML, CSS and React for your frontend interviews.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${plexSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <TopNav />
        <NavigationLoader />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
