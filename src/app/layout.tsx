import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import { Providers } from '../components/OnchainProviders';
import { Coiny, Noto_Sans_Mono } from 'next/font/google';

import './global.css';
import '@coinbase/onchainkit/styles.css';

const coiny = Coiny({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-coiny',
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Healing Honey | 100% Organic Manuka Honey',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Healing Honey | 100% Organic Manuka Honey',
    description: 'Built with OnchainKit',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${coiny.variable} ${notoSansMono.variable}`}>
      <body className='flex items-center justify-center'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
