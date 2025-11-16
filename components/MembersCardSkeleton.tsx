import { Skeleton } from '@/components/ui/skeleton';

const MembersCardSkeleton = () => {
  return (
    <div className='flex flex-col h-full  p-4  hover:shadow-md transition-shadow'>
      <div className='flex flex-col h-full p-4 rounded-xl border shadow-sm'>
        {/* Top Row */}
        <div className='flex items-center justify-between gap-2 pb-3 animate-pulse'>
          <Skeleton className='h-4 w-16 bg-gray-300' />
          <Skeleton className='h-3 w-28 bg-gray-300' />
        </div>

        <div className='w-[90%] mx-auto border-b border-gray-300 my-3'></div>

        {/* Card Info Body */}
        <div className='flex-1 '>
          <div>
            <Skeleton className='w-12 h-12 rounded-full border-gray-100 bg-gray-300' />
          </div>
          <div className='flex gap-2 mt-1'>
            {' '}
            <Skeleton className='h-6 w-20 bg-gray-300' />
            <Skeleton className='h-6 w-12 bg-gray-300' />
            <Skeleton className='h-6 w-12 bg-gray-300' />
          </div>
          <div className='mt-2'>
            <Skeleton className='h-4 w-30 bg-gray-300' />
          </div>
        </div>

        <div className='w-[90%] mx-auto border-b border-gray-300 my-3'></div>

        {/* Footer */}
        <div className='flex items-center justify-between pt-4 mt-4'>
          <Skeleton className='h-4 w-40 bg-gray-300' />
          <Skeleton className='h-4 w-32 bg-gray-300' />
        </div>
      </div>
    </div>
  );
};

export default MembersCardSkeleton;
