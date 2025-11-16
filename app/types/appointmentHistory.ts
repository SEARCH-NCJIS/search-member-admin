export interface AppointmentHistory {
  id: string;
  state: string;
  nameTitle: string;
  lastName: string;
  firstName: string;
  appointingOfficialLastName: string;
  appointingOfficialFirstName: string;
  appointmentDate: string;
  alternate: string;
  endOfTerm: string;
  notes?: string;
}
