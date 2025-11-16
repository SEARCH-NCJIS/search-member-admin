import React from 'react';
import Image from 'next/image';
import { SmartBackButton } from './SmartBackButton';
import { MemberActions } from '@/app/member/memberActions';

import Link from 'next/link';
import { Member } from '@/app/types/member';

const MemberHeader = ({ member }: { member: Member }) => {
  return (
    <div className='max-w-7xl mx-auto mb-4 space-y-6'>
      <div className='flex items-end mb-4'>
        <Link href='/members/state-members'>
          <Image
            className='shrink-0'
            src='/SEARCHLogoTransparent.png'
            alt='SEARCH logo'
            width={150}
            height={150}
          />
        </Link>
        <h1 className='ml-4 text-3xl leading-none'>Member Details</h1>
      </div>
      <div className='flex justify-between items-center'>
        <SmartBackButton fallbackHref='/state-members' />
        <div className='flex gap-2'>
          <MemberActions member={member} />
        </div>
      </div>
    </div>
  );
};

export default MemberHeader;
