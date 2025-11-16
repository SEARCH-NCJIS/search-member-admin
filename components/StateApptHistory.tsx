'use client';
import React, { useState, useMemo } from 'react';
import type { AppointmentHistory } from '@/app/types/appointmentHistory';
import { Badge } from '@/components/ui/badge';
import { SmartBackButton } from './SmartBackButton';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
import Image from 'next/image';

type StateApptHistoryProps = {
  state: string;
  appointmentHistory: AppointmentHistory[];
};

const StateApptHistory: React.FC<StateApptHistoryProps> = ({
  state,
  appointmentHistory
}) => {
  const [search, setSearch] = useState('');

  const filteredAndSorted = useMemo(() => {
    const term = search.trim().toLowerCase();

    const sameState = appointmentHistory.filter(
      appointment => appointment.state === state
    );

    const sorted = [...sameState].sort(
      (a, b) =>
        new Date(b.appointmentDate).getTime() -
        new Date(a.appointmentDate).getTime()
    );

    if (!term) return sorted;

    return sorted.filter(appointment => {
      const haystack = (
        `${appointment.firstName} ${appointment.lastName} ` +
        `${appointment.appointingOfficialFirstName ?? ''} ` +
        `${appointment.appointingOfficialLastName ?? ''} ` +
        `${appointment.notes ?? ''}`
      )
        .toLowerCase()
        .trim();

      return haystack.includes(term);
    });
  }, [appointmentHistory, state, search]);

  return (
    <div className='space-y-4'>
      <div className='sticky top-0 z-10 bg-white/80 backdrop-blur border-b'>
        <div className='max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between px-4 py-4'>
          <div className='flex items-end  justify-end'>
            <Link href='/members/state-members'>
              <Image
                className='flex justify-center'
                src='/SEARCHLogoTransparent.png'
                alt='Search Logo'
                width={250}
                height={250}
              />
            </Link>
            <div className='mx-4 h-12 w-px bg-slate-400/60'></div>

            <div className='flex flex-col ml-4'>
              <p className='flex text-xs uppercase tracking-wide text-slate-500'>
                Appointment history for
              </p>
              <h1 className='text-2xl font-semibold'>
                {state}{' '}
                <span className='ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700'>
                  {filteredAndSorted.length} records
                </span>
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search name, official, notes...'
              className='w-64 max-w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <SmartBackButton fallbackHref='/members/state-members' />
        <a
          className='ml-2 flex items-center gap-2 text-xs sm:text-sm'
          href={`/api/reports/state-appointment-history/excel/${state.toLowerCase()}`}
          download={'state_appt_history_' + state.toLowerCase() + '.xlsx'}
        >
          <Image
            src='/excel.jpg'
            alt='Export to Excel'
            width={20}
            height={20}
          />
          <span className='text-gray-500'>Export to Excel</span>
        </a>
      </div>

      <Table>
        <TableCaption>{state} Appointment History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Appointing Official</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>End of Term</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSorted.map((appointment, index) => {
            const isCurrent = index === 0;

            return (
              <TableRow
                key={
                  appointment.id ??
                  `${index}-${appointment.id}-${appointment.lastName}-${appointment.appointmentDate}`
                }
              >
                <TableCell className='flex items-center gap-2'>
                  {appointment.firstName} {appointment.lastName}
                  {isCurrent && (
                    <Badge
                      className='bg-green-500 text-white'
                      variant='default'
                    >
                      Current
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {appointment.appointingOfficialFirstName}{' '}
                  {appointment.appointingOfficialLastName}
                </TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.endOfTerm}</TableCell>
                <TableCell>{appointment.notes}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StateApptHistory;
