import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';

const Header = () => {
  const { status, data } = useSession();
  return (
    <header>
      <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-50 text-gray-600 hover:text-gray-700 focus:text-gray-700 shadow-md'>
        <div className='container-fluid w-full flex flex-wrap items-center justify-end px-10'>
          <div className='container-fluid flex justify-between w-full px-5'>
            <Link href='/'>Job Offers</Link>

            {(status === 'authenticated' && (
              <div className='space-x-5'>
                <Link
                  className='text-base text-gray-700 hover:text-black hover:underline '
                  href='/posting'
                >
                  Post a Notice
                </Link>
                <button
                  className='text-base text-gray-700 hover:text-black hover:underline '
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
                <Link
                  className='text-base text-gray-700 hover:text-black hover:underline '
                  href='/profile'
                >
                  {data.user?.name}
                </Link>
              </div>
            )) || (
              <div className='space-x-5'>
                <Link
                  className='text-base text-gray-700 hover:text-black hover:underline '
                  href='/login'
                >
                  Login
                </Link>
                <Link
                  className='text-base text-gray-700 hover:text-black hover:underline '
                  href='/signup'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
