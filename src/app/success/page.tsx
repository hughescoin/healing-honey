'use client';
import { text } from '@coinbase/onchainkit/theme';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const transactionHash = searchParams.get('tx');

  return (
    <div className='text-center space-y-4'>
      <h1 className={text.headline}>Subscription Successful!</h1>

      <p className={text.body}>
        Thank you for subscribing. Your 15% discount will be applied to future
        purchases.
      </p>

      {transactionHash && (
        <div className='mt-4 p-4 bg-black rounded-lg'>
          <p className='text-sm text-white mb-2'>Transaction Details:</p>
          <a
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#ffb300] hover:underline text-sm break-all'
          >
            🕵️‍♂️ View transaction: {transactionHash}
          </a>
        </div>
      )}

      <Link
        href='/'
        className='inline-block mt-6 px-6 py-3 bg-[#ff6e00] text-white rounded-xl hover:bg-[#ff6e00]/90 transition-colors'
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
