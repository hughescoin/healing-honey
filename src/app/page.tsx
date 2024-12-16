'use client';
import OnchainStore from 'src/components/OnchainStore';

export default function Page() {
  return (
    <main className='h-screen pt-24'>
      <div className='h-[calc(100vh-6rem)] overflow-y-auto'>
        <OnchainStore />
      </div>
    </main>
  );
}
