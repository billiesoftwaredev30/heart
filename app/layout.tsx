import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heart & Billie — Our Scrapbook & Diary',
  description: 'A modern minimalist couples diary and romantic scrapbook for Heart & Billie. Filled with memories, photos, tulip blossoms, and endless love.',
  keywords: ['Heart and Billie', 'Couples Diary', 'Love Scrapbook', 'Tulip Love', 'Romantic Memories'],
  openGraph: {
    title: 'Heart & Billie — Our Digital Diary & Scrapbook',
    description: 'A timeless sanctuary of our favorite memories, letters, and adventures together.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
