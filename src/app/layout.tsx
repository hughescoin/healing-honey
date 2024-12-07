import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import { Providers } from '../components/OnchainProviders';

import './global.css';
import '@coinbase/onchainkit/styles.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Onchain Commerce Template',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Onchain Commerce Template',
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
    <html lang='en'>
      <body className='flex items-center justify-center'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
