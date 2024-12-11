'use client';
import { text } from '@coinbase/onchainkit/theme';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const transactionHash = searchParams.get('tx');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='text-center space-y-4'>
        <h1 className={text.headline}>Subscription Successful!</h1>

        <p className={text.body}>
          Thank you for subscribing. Your 15% discount will be applied to future
          purchases.
        </p>

        {transactionHash && (
          <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
            <p className='text-sm text-gray-600 mb-2'>Transaction Details:</p>
            <a
              href={`https://sepolia.basescan.org/tx/${transactionHash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline text-sm break-all'
            >
              View transaction {transactionHash}
            </a>
          </div>
        )}

        <Link
          href='/'
          className='inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
