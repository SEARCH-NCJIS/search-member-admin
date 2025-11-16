// app/[state]/history/page.tsx
import React from 'react';
import StateApptHistory from '@/components/StateApptHistory';
import { slugify, prettyStateFromSlug } from '@/app/utils/slugify';
import type { AppointmentHistory } from '@/app/types/appointmentHistory';

type PageProps = {
  params: Promise<{ state: string }>;
};

const StateHistoryPage = async ({ params }: PageProps) => {
  const stateSlug = (await params).state; // "new-york"
  const displayState = prettyStateFromSlug(stateSlug); // "New York"

  const res = await fetch(
    `${
      process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    }/api/appointment-history/${stateSlug}`,
    { cache: 'no-store' }
  );

  const { appointmentHistory } = (await res.json()) as {
    appointmentHistory: AppointmentHistory[];
  };

  // (Optional) you can filter here and pass only relevant rows:
  const filtered = appointmentHistory.filter(
    appointment => slugify(appointment.state) === stateSlug
  );

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <StateApptHistory state={displayState} appointmentHistory={filtered} />
    </div>
  );
};

export default StateHistoryPage;
