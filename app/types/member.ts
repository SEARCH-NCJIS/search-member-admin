import { AppointmentInfo } from './appointmentInfo';
import { Invoicing } from './invoicing';
import { AdminInfo } from './admin';

export type MemberStatus =
  | 'Active'
  | 'Inactive'
  | 'No Appointment'
  | 'Appointment Pending';

type MemberType = 'STATE' | 'AT_LARGE' | 'EMERITUS';

export interface Member {
  memberTupe: MemberType;

  _id?: string;
  title?: string;
  state: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  agency: string;
  address?: string;
  city?: string;
  zipCode?: string;
  isBoard?: boolean;
  isActive?: boolean;
  boardRole?: 'Chair' | 'Vice Chair' | 'Member';
  tags?: string[]; // Committees
  status: MemberStatus;
  appointingOfficial?: string;
  appointingOfficialTitle?: string;
  appointmentDate: string; // ISO date string
  endOfTerm: string; // ISO date string
  alternate?: string;
  businessPhone?: string;
  cellPhone?: string;
  notes?: string;
  photoUrl?: string;

  appointment?: AppointmentInfo;
  invoicing?: Invoicing;
  admin?: AdminInfo;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
