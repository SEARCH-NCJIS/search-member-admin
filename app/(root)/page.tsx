'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4'>
      <div className='mb-8'>
        <Image
          src='/SEARCHLogoTransparent.png'
          alt='SEARCH Logo'
          width={200}
          height={200}
          className='drop-shadow-sm'
        />
      </div>

      <div className='bg-white w-full max-w-md rounded-xl shadow-md p-8 border border-gray-200'>
        <h1 className='text-2xl font-bold text-center mb-1 text-gray-800'>
          SEARCH Member Admin Portal
        </h1>
        <p className='text-center text-gray-500 mb-8 text-sm'>
          Secure login using Microsoft Entra ID
        </p>
        <Button
          className='w-full h-12 flex items-center justify-center gap-3 text-sm font-medium bg-gray-900 hover:bg-gray-800 cursor-pointer'
          onClick={() =>
            signIn('microsoft-entra-id', {
              callbackUrl: '/members/state-members'
            })
          }
        >
          <Image src='/mlogo.png' alt='Microsoft Logo' width={24} height={24} />
          Login with your Microsoft 365 credentials
        </Button>
      </div>

      <p className='mt-8 text-xs text-gray-400 text-center'>
        &copy; {new Date().getFullYear()} SEARCH Group, Inc. All rights
        reserved.
      </p>
    </div>
  );
}
