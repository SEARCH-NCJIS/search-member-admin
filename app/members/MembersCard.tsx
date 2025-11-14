'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Member } from '@/app/types/member';
import CardFooter from '@/components/CardFooter';
import { UserRound } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';

const MembersCard = ({ member }: { member: Member }) => {
  return (
    <>
      <div className='flex flex-col h-full rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow '>
        <div className='flex items-center justify-between gap-2 font-bold pb-3'>
          <div className='flex justify-between'>{member.state}</div>
          <div className='flex justify-between'>
            <AlertDialog>
              <span className='text-[10px] text-blue-500'>
                <AlertDialogTrigger className='cursor-pointer'>
                  Appointment Information
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='font-bold text-lg '>
                      Appointment Information
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className='mt-2 space-y-2'>
                        <div>
                          <strong>Appointing Official:</strong>{' '}
                          {member.appointingOfficial
                            ? `${member.appointingOfficial} (${
                                member.appointingOfficialTitle ?? 'Title N/A'
                              })`
                            : 'N/A'}
                        </div>
                        <div>
                          <strong>Appointment Date:</strong>{' '}
                          {member.appointmentDate
                            ? new Date(
                                member.appointmentDate
                              ).toLocaleDateString()
                            : 'N/A'}
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

        <div className='w-[90%] mx-auto border-b border-gray-300 my-3'></div>

        <div className='flex-1'>
          <div className=''>
            <div className='text-base font-semibold '>
              <div>
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    width={50}
                    height={50}
                    className='rounded-full border border-gray-300'
                  />
                ) : (
                  <UserRound className='w-12 h-12 text-gray-400 rounded-full border border-gray-300' />
                )}
              </div>
              <Link
                href={`/member/${member._id}` as string}
                className='text-[#128BC1]'
              >
                {member.firstName} {member.lastName}{' '}
              </Link>
              <span>
                <Badge
                  className={
                    member.isBoard
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }
                  variant='default'
                >
                  {member.isBoard ? 'Board' : 'Member'}
                </Badge>
              </span>
              <span className='ml-2'>
                {member.boardRole ? (
                  <Badge variant='default'>{member.boardRole}</Badge>
                ) : null}
              </span>
              <span>
                <Badge
                  className={
                    member.isActive
                      ? 'bg-green-500 text-white ml-2'
                      : 'bg-gray-200 text-gray-800 ml-2'
                  }
                  variant='default'
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </span>
            </div>
            <div className='text-sm text-blue-500'>
              <Link href={`mailto:${member.email}`}>{member.email}</Link>
            </div>
          </div>
          <div className='text-base'>{member.title}</div>
          <div className='text-sm'>{member.agency}</div>
        </div>
        <div className='w-[90%] mx-auto border-b border-gray-300 my-3'></div>
        <CardFooter
          state={member.state}
          memberNotes={member.notes ? member.notes : 'No Notes available.'}
          alternate={
            member.alternate ? member.alternate : 'No Alternate available.'
          }
        />
      </div>
    </>
  );
};

export default MembersCard;
