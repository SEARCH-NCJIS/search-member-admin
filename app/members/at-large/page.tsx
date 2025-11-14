'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useMembersFilters } from '../MembersFilterContext';
import { Member } from '@/app/types/member';
import { groupByStateSorted } from '@/app/utils/groupByStateSorted';
import MembersCard from '../MembersCard';

export default function AtLargeMembersPage() {
  const { query, boardOnly, statusFilter } = useMembersFilters();
  const [atLargeMembers, setAtLargeMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await fetch('/api/members/at-large', {
          cache: 'no-store'
        });

        if (!res.ok) {
          throw new Error(`Failed to load members: ${res.status}`);
        }

        const data = await res.json();

        setAtLargeMembers(data.atLarge ?? []);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Failed to load members.');
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  console.log('At-Large Members:', atLargeMembers);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return atLargeMembers
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
  }, [boardOnly, atLargeMembers, query, statusFilter]);

  const grouped = useMemo(() => groupByStateSorted(filtered), [filtered]);

  return (
    <div className='space-y-6'>
      {grouped.length === 0 && (
        <div className='text-gray-500'>No Members match your filters.</div>
      )}

      <div className='space-y-4'>
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
  );
}
