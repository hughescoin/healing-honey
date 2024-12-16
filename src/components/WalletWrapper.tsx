'use client';
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';

type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({
  className,
  text,
}: WalletWrapperParams) {
  return (
    <div className='relative' style={{ isolation: 'isolate' }}>
      <Wallet>
        <ConnectWallet className={className}>
          <Avatar className='h-6 w-6' />
          <Name />
          <ConnectWalletText>{text}</ConnectWalletText>
        </ConnectWallet>
        <WalletDropdown className='absolute top-full right-0 z-[9999] bg-white shadow-lg rounded'>
          <Identity className='px-4 pt-3 pb-2' hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownDisconnect />
          <WalletDropdownLink icon='wallet' href='https://wallet.coinbase.com'>
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownFundLink />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
