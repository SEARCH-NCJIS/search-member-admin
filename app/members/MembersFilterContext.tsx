'use client';
import React, { createContext, useContext, useState } from 'react';

export type StatusFilter =
  | 'All'
  | 'Active'
  | 'Inactive'
  | 'No Appointment'
  | 'Appointment Pending';

type MembersFilterContextValue = {
  query: string;
  setQuery: (v: string) => void;
  boardOnly: boolean;
  setBoardOnly: (v: boolean) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (v: StatusFilter) => void;
};

const MembersFilterContext = createContext<MembersFilterContextValue | null>(
  null
);

export const useMembersFilters = () => {
  const ctx = useContext(MembersFilterContext);
  if (!ctx) {
    throw new Error(
      'useMembersFilters must be used within a MembersFilterProvider'
    );
  }
  return ctx;
};

export const MembersFilterProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState('');
  const [boardOnly, setBoardOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  return (
    <MembersFilterContext.Provider
      value={{
        query,
        setQuery,
        boardOnly,
        setBoardOnly,
        statusFilter,
        setStatusFilter
      }}
    >
      {children}
    </MembersFilterContext.Provider>
  );
};
