'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MembersFilterProvider,
  useMembersFilters
} from './MembersFilterContext';
import '../globals.css';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const tabs = [
  { href: '/members/state-members', label: 'State Members' },
  { href: '/members/at-large', label: 'At-Large Members' },
  { href: '/members/emeritus', label: 'Member Emeritus' },
  { href: '/members/all', label: 'All Members' }
];

function MembersToolbar() {
  const pathname = usePathname();
  const activeTab =
    tabs.find(tab => pathname.startsWith(tab.href))?.label ?? 'Members';

  console.log('Active Tab:', activeTab);

  const {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    boardOnly,
    setBoardOnly
  } = useMembersFilters();

  return (
    <div className='border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        {/* LEFT: Tabs */}
        <div className='flex flex-wrap gap-4'>
          {tabs.map(tab => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-1 text-sm font-medium border-b-2 transition-colors ${
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Filters */}
        <div className='flex flex-wrap gap-2 items-center'>
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search by name, email, agency, state...'
            className='w-64 max-w-full rounded border text-sm placeholder:text-[12px]'
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

          <a
            className='ml-2 flex items-center gap-2 text-xs sm:text-sm'
            href={
              activeTab === 'State Members'
                ? '/api/reports/state-members/excel'
                : activeTab === 'At-Large Members'
                ? '/api/reports/atLarge/excel'
                : activeTab === 'Member Emeritus'
                ? '/api/reports/emeritus/excel'
                : '/api/reports/all-members/excel'
            }
            download={
              activeTab === 'State Members'
                ? 'State_Members.xlsx'
                : activeTab === 'At-Large Members'
                ? 'At_Large_Members.xlsx'
                : activeTab === 'Member Emeritus'
                ? 'Member_Emeritus.xlsx'
                : 'All_Members.xlsx'
            }
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
      </div>
    </div>
  );
}

export default function MembersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab =
    tabs.find(tab => pathname.startsWith(tab.href))?.label ?? 'Members';
  return (
    <MembersFilterProvider>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        <div className='flex items-center justify-between'>
          <Image
            src='/SEARCHLogoTransparent.png'
            alt='SEARCH logo'
            width={150}
            height={150}
          />
          <h1 className='text-3xl sm:text-4xl font-bold text-right'>
            {activeTab}
          </h1>
        </div>

        <MembersToolbar />

        <div className='pt-4'>{children}</div>
      </div>
    </MembersFilterProvider>
  );
}
