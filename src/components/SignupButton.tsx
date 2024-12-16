'use client';
import WalletWrapper from './WalletWrapper';

type SignupButtonProps = {
  className?: string;
};

export default function SignupButton({ className }: SignupButtonProps) {
  return (
    <WalletWrapper
      className={`${className} bg-blue-500 hover:bg-blue-600 text-white ockConnectWallet_Container min-w-[90px] shrink bg-slate-200 text-[#030712] hover:bg-slate-300'`}
      text='Sign up'
    />
  );
}
