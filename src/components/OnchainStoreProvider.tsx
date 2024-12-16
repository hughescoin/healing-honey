import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { OnchainStoreContextType } from '../types';
import starterPackImage from '../images/starterpack.webp';
import jarImage from '../images/single-jar.webp';
import mugImage from '../images/bee-mug.webp';
import packs from '../images/packs.webp';
import type { Product } from 'src/types';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

const products: Product[] = [
  {
    id: 'product1',
    name: `Manuka Honey Starter Kit`,
    price: 0.25,
    image: starterPackImage,
  },
  {
    id: 'product2',
    name: `Manuka Honey 500g`,
    price: 0.1,
    image: jarImage,
  },
  {
    id: 'product3',
    name: `"Bee Cool" MUG`,
    price: 0.02,
    image: mugImage,
  },
  {
    id: 'product4',
    name: `Manuka Honey Packets 7g ea.`,
    price: 0.05,
    image: packs,
  },
];

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState({});
  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
    };
  }, [quantities]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
