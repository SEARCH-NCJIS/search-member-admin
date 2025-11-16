import React from 'react';
import type { Member } from '@/app/types/member';
import type { Invoicing } from '@/app/types/invoicing';
import type { AdminInfo } from '@/app/types/admin';
import MemberHeader from '@/components/MemberHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

type MemberDetailCardProps = {
  member: Member;
  invoicing: Invoicing;
};

const MemberDetailCard = ({ member, invoicing }: MemberDetailCardProps) => {
  return (
    <>
      <div>
        <MemberHeader member={member} />
      </div>
      <section className='w-full mx-auto max-w-7xl'>
        <div className='border rounded-xl shadow-sm bg-white p-6 space-y-4'>
          <header className='flex flex-wrap items-start justify-between gap-4'>
            <div className='flex'>
              <Image
                className='rounded-full mr-4'
                src={member.photoUrl || '/default-avatar.png'}
                alt={`${member.firstName} ${member.lastName}`}
                width={75}
                height={75}
              />
              <div className='flex flex-col justify-center'>
                <h1 className='text-2xl font-semibold'>
                  {member.firstName} {member.lastName}
                </h1>
                <p className='text-sm text-gray-600'>
                  {member.title ? `${member.title} ` : ''}
                  {member.agency ? `| ${member.agency}` : ''}
                </p>
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Badge className='bg-green-500' variant='default'>
                {member.status}
              </Badge>
              <Badge className='bg-blue-500' variant='default'>
                {member.isBoard ? 'Board Member' : 'Member'}
              </Badge>
              {member.isBoard ? <Badge variant='default'>Board</Badge> : null}
              {member.isBoard && member.boardRole ? (
                <Badge className='bg-purple-500' variant='default'>
                  {member.boardRole}
                </Badge>
              ) : null}
            </div>
          </header>

          {/* TABS */}
          <Tabs defaultValue='contact' className='mt-2'>
            <TabsList className='mb-4 bg-[#128BC1] text-white rounded-md'>
              <TabsTrigger
                className='text-white data-[state=active]:text-gray-700'
                value='contact'
              >
                Contact Info
              </TabsTrigger>
              <span className='text-gray-400 mx-2 select-none'>|</span>
              <TabsTrigger
                className='text-white data-[state=active]:text-gray-700'
                value='appointment'
              >
                Appointment Information
              </TabsTrigger>
              <span className='text-gray-400 mx-2 select-none'>|</span>
              <TabsTrigger
                className='text-white data-[state=active]:text-gray-700'
                value='invoicing'
              >
                Invoicing Information
              </TabsTrigger>
              <span className='text-gray-400 mx-2 select-none'>|</span>
              <TabsTrigger
                className='text-white data-[state=active]:text-gray-700'
                value='admin'
              >
                Administrative Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value='contact' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                {/* <div className='space-y-1'>
                <h2 className='font-bold text-sm text-gray-700'>
                  Contact Information
                </h2>
                <p className='text-sm'>
                  {member.firstName} {member.lastName}
                </p>
                {member.title && (
                  <p className='text-sm text-gray-600'>{member.title}</p>
                )}
                {member.agency && (
                  <p className='text-sm text-gray-600'>{member.agency}</p>
                )}
              </div> */}

                {/* <div className='space-y-1'>
                <h2 className='font-medium text-sm text-gray-700'>Status</h2>
                <p className='text-sm'>{member.status}</p>
              </div> */}
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-1'>
                  <h3 className='font-bold text-sm text-gray-700'>Address</h3>
                  <p className='text-sm'>
                    {member.address && (
                      <>
                        {member.address}
                        <br />
                      </>
                    )}
                    {member.city && member.state && member.zipCode && (
                      <>
                        {member.city}, {member.state} {member.zipCode}
                      </>
                    )}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='font-bold text-sm text-gray-700'>
                    Contact Data
                  </h3>
                  {member.email && (
                    <p className='text-sm'>
                      <span className='font-medium'>Email: </span>
                      <Link
                        className='text-blue-500'
                        href={`mailto:${member.email}`}
                      >
                        {member.email}
                      </Link>
                    </p>
                  )}
                  {member.businessPhone && (
                    <p className='text-sm'>
                      <span className='font-medium'>Business Phone: </span>
                      {member.businessPhone}
                    </p>
                  )}
                  {member.cellPhone && (
                    <p className='text-sm'>
                      <span className='font-medium'>Cell Phone: </span>
                      {member.cellPhone}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Appointment Information  */}
            <TabsContent value='appointment' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-1'>
                  <h3 className='font-bold text-sm text-gray-700'>
                    Appointment Information
                  </h3>
                  {member.appointingOfficial && (
                    <p className='text-sm'>
                      <span>Appointing Executive: </span>
                      {member.appointingOfficialTitle}{' '}
                      {member.appointingOfficial}
                    </p>
                  )}
                  {member.appointmentDate && (
                    <p className='text-sm'>
                      <span className='font-medium'>Appointment Date: </span>
                      {new Date(member.appointmentDate).toLocaleDateString()}
                    </p>
                  )}
                  {member.endOfTerm ? (
                    <p className='text-sm'>
                      <span className='font-medium'>End of Term: </span>
                      {new Date(member.endOfTerm).toLocaleDateString()}
                    </p>
                  ) : (
                    <p className='text-sm'>
                      <span className='font-medium'>End of Term: </span>
                      Currently Serving
                    </p>
                  )}
                </div>
                <div className='space-y-1'>
                  <h3 className='font-bold text-sm text-gray-700'>
                    Appointment Notes
                  </h3>
                  <p className='text-sm text-gray-700 whitespace-pre-wrap'>
                    {member.notes || 'No notes available.'}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Invoicing Tab */}
            {/* TODO: Add invoicing information */}
            <TabsContent value='invoicing' className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-sm text-gray-700'>
                  Invoicing Contact
                </h3>
              </div>
            </TabsContent>

            {/* Admin Tab */}
            {/* TODO: Add admin information */}
            <TabsContent value='admin' className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-sm text-gray-700'>
                  Admin Information
                </h3>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default MemberDetailCard;
