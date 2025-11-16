'use client';

import React from 'react';
import { SessionProvider, signOut } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  MembersFilterProvider,
  useMembersFilters
} from './MembersFilterContext';
import '../globals.css';

import { SidebarNav } from '@/components/SidebarNav';

import { SidebarProvider } from '@/components/ui/sidebar';

import { usePathname } from 'next/navigation';

function MembersToolbar() {
  const {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    boardOnly,
    setBoardOnly
  } = useMembersFilters();

  return (
    <div className='flex flex-wrap items-center gap-3 '>
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search by name, email, agency, state...'
        className='w-full sm:w-72 text-sm placeholder:text-[12px]'
      />

      <Select
        value={statusFilter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onValueChange={value => setStatusFilter(value as any)}
      >
        <SelectTrigger className='w-[180px] rounded border text-sm'>
          <SelectValue placeholder='Filter by Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Active'>Active</SelectItem>
            <SelectItem value='Inactive'>Inactive</SelectItem>
            <SelectItem value='No Appointment'>No Appointment</SelectItem>
            <SelectItem value='Appointment Pending'>
              Appointment Pending
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label className='flex items-center gap-2 text-xs sm:text-sm'>
        <Checkbox
          checked={boardOnly}
          onCheckedChange={setBoardOnly}
          className='h-4 w-4'
        />
        Board Only
      </Label>
    </div>
  );
}

export default function MembersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <MembersFilterProvider>
        <SidebarProvider>
          {/* Main shell: sidebar + content */}
          <div className='flex min-h-screen'>
            {/* LEFT: Sidebar */}
            <SidebarNav />

            {/* RIGHT: Main content */}
            <main className='flex-1 px-6 py-6 space-y-6'>
              {/* Logo / header row */}
              <div className='flex items-center justify-between mb-2'>
                <h1 className='text-2xl font-bold'>
                  {pathname.includes('at-large')
                    ? 'At-Large Members'
                    : pathname.includes('emeritus')
                    ? 'Member Emeritus'
                    : 'State Members'}
                </h1>
              </div>

              <MembersToolbar />

              <div className='pt-2'>{children}</div>
            </main>
          </div>
        </SidebarProvider>
      </MembersFilterProvider>
    </SessionProvider>
  );
}
