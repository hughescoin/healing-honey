'use client';

import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'onchain-commerce-template',
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});
