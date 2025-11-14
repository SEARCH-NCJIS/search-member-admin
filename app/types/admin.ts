export interface AdminInfo {
  portalAccess?: boolean;
  welcomeLetterSent?: boolean;
  headshotOnFile?: boolean;
  meetingsAttendedByYear?: Record<string, number>;
}
