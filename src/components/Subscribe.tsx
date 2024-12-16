'use client';
import { cn, color, pressable, text } from '@coinbase/onchainkit/theme';
import { useEffect, useState, useMemo } from 'react';
import {
  useAccount,
  useChainId,
  useConnect,
  useConnectors,
  useSignTypedData,
} from 'wagmi';
import { Address, Hex, parseEther } from 'viem';
import { useQuery } from '@tanstack/react-query';
import { spendPermissionManagerAddress } from '../app/lib/abi/SpendPermissionManager';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import { getPrice } from '../app/lib/price';

type SubscribeProps = {
  className?: string;
};

export default function Subscribe({ className }: SubscribeProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [signature, setSignature] = useState<Hex>();
  const [transactions, setTransactions] = useState<Hex[]>([]);
  const [spendPermission, setSpendPermission] = useState<object>();
  const [price, setPrice] = useState<number>();
  const { signTypedDataAsync } = useSignTypedData();
  const account = useAccount();
  const chainId = useChainId();
  const { connectAsync } = useConnect();
  const connectors = useConnectors();

  const { data, refetch } = useQuery({
    queryKey: ['collectSubscription'],
    queryFn: handleCollectSubscription,
    refetchOnWindowFocus: false,
    enabled: !!signature,
  });

  const { quantities, products } = useOnchainStoreContext();

  const totalSum = useMemo(() => {
    return (
      products?.reduce(
        (sum, product) => sum + (quantities[product.id] || 0) * product.price,
        0
      ) || 0
    );
  }, [products, quantities]);

  const subscriptionAmount = useMemo(() => {
    console.log('totalSum', totalSum);
    console.log('totalSum with 15%', totalSum * 0.15);
    return Number(totalSum * 0.85);
  }, [totalSum]);

  async function handleSubmit() {
    setIsDisabled(true);
    let accountAddress = account?.address;
    if (!accountAddress) {
      try {
        const requestAccounts = await connectAsync({
          connector: connectors[0],
        });
        accountAddress = requestAccounts.accounts[0];
      } catch {
        return;
      }
    }

    const domain = {
      name: 'Spend Permission Manager',
      version: '1',
      chainId: chainId,
      verifyingContract: spendPermissionManagerAddress,
    } as const;

    const types = {
      SpendPermission: [
        { name: 'account', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'token', type: 'address' },
        { name: 'allowance', type: 'uint160' },
        { name: 'period', type: 'uint48' },
        { name: 'start', type: 'uint48' },
        { name: 'end', type: 'uint48' },
        { name: 'salt', type: 'uint256' },
        { name: 'extraData', type: 'bytes' },
      ],
    } as const;

    console.log('subscriptionAmount', subscriptionAmount);
    console.log('price', price);

    const subscriptionAmountInEther = price ? subscriptionAmount / price : 0;
    const subscriptionAmountInWei = parseEther(
      subscriptionAmountInEther.toString()
    );

    const message = {
      account: accountAddress,
      spender: process.env.NEXT_PUBLIC_SPENDER_ADDRESS! as Address,
      token: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as Address,
      allowance: subscriptionAmountInWei,
      period: 86400, //2592000, // 30 days, sometimes 29 ;)
      start: Math.floor(Date.now() / 1000),
      end: 281474976710655,
      salt: BigInt(0),
      extraData: '0x' as Hex,
    } as const;

    try {
      console.log('Signing data:', { domain, types, message });

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'SpendPermission',
        message,
      });

      console.log('Signature:', signature);
      setSpendPermission(message);
      setSignature(signature);
    } catch (e) {
      console.error('Signing error:', e);
    }
    setIsDisabled(false);
  }

  async function handleCollectSubscription() {
    setIsDisabled(true);
    let data;
    try {
      const replacer = (key: string, value: any) => {
        if (typeof value === 'bigint') {
          return value.toString();
        }
        return value;
      };
      const response = await fetch('/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            spendPermission,
            signature,
            dummyData: Math.ceil(Math.random() * 100),
          },
          replacer
        ),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data = await response.json();
    } catch (e) {
      console.error(e);
    }
    setIsDisabled(false);
    return data;
  }

  useEffect(() => {
    if (!data) return;
    setTransactions([data?.transactionHash, ...transactions]);
  }, [data]);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getPrice();
      setPrice(price);
    };
    fetchPrice();
  }, []);

  return (
    <div className={cn('w-full', className)}>
      {!signature ? (
        <div className='flex w-full'>
          <button
            className={cn(
              pressable.primary,
              'w-full rounded-xl',
              'px-4 py-3 font-medium text-base text-white leading-6',
              (isDisabled || !totalSum) && pressable.disabled,
              text.headline
            )}
            onClick={handleSubmit}
            type='button'
            disabled={isDisabled || !totalSum}
            data-testid='ockTransactionButton_Button'
          >
            <span
              className={cn(
                text.headline,
                color.inverse,
                'flex justify-center'
              )}
            >
              Subscribe & Save 15%
            </span>
          </button>
        </div>
      ) : (
        <>
          {data?.transactionHash &&
            typeof window !== 'undefined' &&
            window.location.replace(`/success?tx=${data.transactionHash}`)}
          <div className='flex flex-col items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4'></div>
            <div>Processing transaction...</div>
          </div>
        </>
      )}
    </div>
  );
}
