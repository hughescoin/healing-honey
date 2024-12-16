import type { Product } from 'src/types';
import Image from 'next/image';
import QuantityInput from './QuantityInput';
import { useEffect, useState } from 'react';
import { getPrice } from '../app/lib/price';

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  const [ethPrice, setEthPrice] = useState<number>();

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getPrice();
      setEthPrice(price);
    };
    fetchPrice();
  }, []);

  const priceInEth = ethPrice ? price / ethPrice : 0;

  return (
    <div className='store-item mx-auto flex w-full flex-col p-4 sm:mx-0 lg:p-6'>
      <div className='mb-1 flex items-start justify-between'>
        <h2 className='font-regular text-sm font-semibold text-[#ffb300] font-coiny'>
          {name}
        </h2>
      </div>
      <div className='relative h-[200px] w-full'>
        <Image
          src={image}
          alt={`Premium Manuka Honey - ${name}`}
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='flex flex-col gap-1 mt-4'>
        <div className='flex items-center justify-between'>
          <p className='font-regular text-sm text-[#ffb300] font-coiny'>
            {price.toFixed(2)} USDC
          </p>
          <p className='font-regular text-xs text-[#ffb300] font-coiny'>
            ≈ {priceInEth.toFixed(6)} ETH
          </p>
        </div>
        <div className='flex justify-end'>
          <QuantityInput productId={id} />
        </div>
      </div>
    </div>
  );
}
