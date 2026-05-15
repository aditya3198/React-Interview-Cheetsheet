import type { Metadata } from 'next';
import './globals.scss';
import TopNav from '@/components/layout/TopNav';
import NavigationLoader from '@/components/layout/NavigationLoader';

export const metadata: Metadata = {
  title: 'Frontend Interview Prep',
  description: 'Master JavaScript, HTML, CSS and React for your frontend interviews.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <NavigationLoader />
        {children}
      </body>
    </html>
  );
}
