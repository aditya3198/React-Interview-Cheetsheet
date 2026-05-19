import type { Metadata } from 'next';
import './globals.scss';
import TopNav from '@/components/layout/TopNav';
import NavigationLoader from '@/components/layout/NavigationLoader';
import CommandPalette from '@/components/CommandPalette';
import { instrumentSerif, plexSans, jetbrainsMono } from './fonts';

export const metadata: Metadata = {
  title: 'frontprep — frontend interview prep',
  description: 'JavaScript, HTML, CSS and React — distilled into syntax cards, theory, version diffs, runnable playgrounds and interview Q&A.',
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
