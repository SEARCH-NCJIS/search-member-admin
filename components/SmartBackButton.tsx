'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SmartBackButtonProps = {
  fallbackHref: string;
  label?: string;
  className?: string;
};

export function SmartBackButton({
  fallbackHref,
  label = 'Back',
  className
}: SmartBackButtonProps) {
  const router = useRouter();

  // Compute hasValidReferrer directly during render
  const hasValidReferrer =
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    document.referrer &&
    document.referrer.includes(window.location.host);

  const handleClick = () => {
    if (hasValidReferrer) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      type='button'
      variant='ghost'
      size='sm'
      onClick={handleClick}
      className={
        className ?? 'inline-flex items-center gap-1 text-xs text-blue-500'
      }
    >
      <ArrowLeft className='h-3 w-3' />
      <span>{label}</span>
    </Button>
  );
}
