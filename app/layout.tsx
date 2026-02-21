import type { Metadata } from 'next';
import { DM_Serif_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans'
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'MovieFlix | Buscador de series',
  description: 'Landing page con buscador usando la API de TVMaze.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${dmSerif.variable}`}>{children}</body>
    </html>
  );
}
