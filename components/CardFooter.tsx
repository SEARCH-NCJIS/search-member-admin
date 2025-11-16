import React from 'react';
import Link from 'next/link';
import { slugify } from '@/app/utils/slugify';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

const CardFooter = ({
  memberNotes,
  alternate,
  state
}: {
  memberNotes: string | null;
  alternate: string | null;
  state: string;
}) => {
  const stateSlug = slugify(state);

  return (
    <>
      <div className='flex items-center justify-between pt-4 mt-4 '>
        <div className='flex justify-between'>
          {' '}
          <Link
            href={`/history/${stateSlug}`}
            className='text-blue-500 text-xs'
          >
            Appointment History
          </Link>
        </div>
        <div className='flex justify-between'>
          {' '}
          <div className='text-blue-500 text-xs'>
            {' '}
            <AlertDialog>
              <span className=' text-blue-500'>
                <AlertDialogTrigger className='cursor-pointer'>
                  Notes
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='font-bold text-lg '>
                      Notes:
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className='mt-2 space-y-2'>
                        <div>{memberNotes}</div>
                        <div>
                          <strong>Alternate:</strong> {alternate}
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <span className='text-red-500'>Close</span>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </span>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
