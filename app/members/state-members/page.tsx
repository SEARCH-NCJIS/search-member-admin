'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useMembersFilters } from '../MembersFilterContext';
import { Member } from '@/app/types/member';
import { groupByStateSorted } from '@/app/utils/groupByStateSorted';
import MembersCard from '../MembersCard';
import MembersCardSkeleton from '@/components/MembersCardSkeleton';

export default function StateMembersPage() {
  const { query, boardOnly, statusFilter } = useMembersFilters();
  const [stateMembers, setStateMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await fetch('/api/members/state-members', {
          cache: 'no-store'
        });

        if (!res.ok) {
          throw new Error(`Failed to load members: ${res.status}`);
        }

        const data = await res.json();

        setStateMembers(data.stateMembers ?? []);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Failed to load members.');
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  console.log('State Members:', stateMembers);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return stateMembers
      .filter(member => (boardOnly ? member.isBoard : true))
      .filter(member =>
        statusFilter === 'All' ? true : member.status === statusFilter
      )
      .filter(member => {
        if (!term) return true;
        const haystack =
          `${member.state} ${member.firstName} ${member.lastName} ${member.email} ${member.agency}`.toLowerCase();
        return haystack.includes(term);
      });
  }, [boardOnly, stateMembers, query, statusFilter]);

  const grouped = useMemo(() => groupByStateSorted(filtered), [filtered]);

  if (loading) {
    return (
      <div className='space-y-6  '>
        {[0, 1].map(section => (
          <section key={section} className='space-y-1'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <MembersCardSkeleton key={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {grouped.length === 0 && (
        <div className='text-gray-500'>No Members match your filters.</div>
      )}

      <div className='flex flex-col h-full  p-4  '>
        <div className='flex items-center justify-between gap-2 pb-3'>
          {/* Optional: show state headers inline */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {grouped.map(([state, members]) =>
              members.map(member => (
                <section key={member._id} className='space-y-1'>
                  <MembersCard member={member} />
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
