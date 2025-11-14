import React from 'react';
import type { AppointmentHistory } from '@/app/types/appointmentHistory';
import { slugify } from '@/app/utils/slugify';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

type StateApptHistoryProps = {
  state: string; // "New York" (pretty)
  appointmentHistory: AppointmentHistory[];
};

const StateApptHistory = ({
  state,
  appointmentHistory
}: StateApptHistoryProps) => {
  const targetSlug = slugify(state); // "New York" -> "new-york"

  const rows = appointmentHistory
    .filter(appointment => slugify(appointment.memberState) === targetSlug)
    .sort(
      (a, b) =>
        new Date(b.appointmentDate).getTime() -
        new Date(a.appointmentDate).getTime()
    )
    .map((appointment, index) => (
      <TableRow
        key={
          appointment.id ??
          `${index}-${appointment.id}-${appointment.lastName}-${appointment.appointmentDate}`
        }
      >
        <TableCell>
          {appointment.firstName} {appointment.lastName}
        </TableCell>
        <TableCell>
          {appointment.appointingOfficialFirstName}{' '}
          {appointment.appointingOfficialLastName}
        </TableCell>
        <TableCell>{appointment.appointmentDate}</TableCell>
        <TableCell>{appointment.endOfTerm}</TableCell>
        <TableCell>{appointment.notes}</TableCell>
      </TableRow>
    ));

  return (
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
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default StateApptHistory;
