import { cn, pressable } from '@coinbase/onchainkit/theme';
import { useCallback, useState } from 'react';
import {
  GITHUB_LINK,
  ONCHAINKIT_LINK,
  TEMPLATE_LINK,
  TWITTER_LINK,
} from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';
import { HoneySvg } from 'src/svg/HoneySvg';
import { HoneyTextSvg } from 'src/svg/HoneyTextSvg';
import { MenuSvg } from 'src/svg/MenuSvg';
import OnchainKitShopSvg from 'src/svg/OnchainKitShopSvg';
import { useAccount } from 'wagmi';

import type { NavbarLinkReact } from 'src/types';

import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
function NavbarLink({ link, label }: NavbarLinkReact) {
  return (
    <li
      className={cn(
        'flex cursor-pointer items-center justify-center gap-2 rounded p-1',
        pressable.default
      )}
    >
      <a
        href={link}
        className='ock-text-foreground flex items-center text-xs'
        target='_blank'
        rel='noreferrer'
      >
        {label}
        <span className='pl-1'>
          <ExternalLinkSvg />
        </span>
      </a>
    </li>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address } = useAccount();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className='-mx-[50vw] fixed top-10 right-1/2 left-1/2 xs:h-11 w-screen border-gray-200 border-b bg-black z-[100]'>
      <div className='flex justify-end'></div>
      <div className='mx-auto flex h-full max-w-5xl items-center px-4 py-2 lg:px-6'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <HoneyTextSvg />
            <span className='text-xl' role='img' aria-label='bee'>
              🐝
            </span>
          </div>
          <div className='flex items-center gap-3 h-8'>
            <SignupButton className='h-8 px-4 py-1 rounded bg-[#ff9100] text-sm text-[#030712] hover:bg-[#ff6e00]' />
            {!address && (
              <LoginButton className='h-8 px-4 py-1 rounded bg-slate-200 text-sm text-[#030712] hover:bg-slate-300' />
            )}
          </div>

          <button
            type='button'
            className={cn('md:hidden', pressable.default)}
            onClick={toggleMenu}
          >
            <MenuSvg />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className='bg-black md:hidden'>
          <ul className='flex flex-col items-start space-y-2 px-4 py-2'>
            <NavbarLink link={TEMPLATE_LINK} label='FORK THIS TEMPLATE' />
            <NavbarLink link={ONCHAINKIT_LINK} label='ONCHAINKIT' />
            <NavbarLink link={GITHUB_LINK} label='GITHUB' />
            <NavbarLink link={TWITTER_LINK} label='X' />
          </ul>
        </div>
      )}
    </header>
  );
}
