import ExcelJS from 'exceljs';

import { Member } from '../types/member';
import { AppointmentInfo } from '../types/appointmentInfo';
import { Invoicing } from '../types/invoicing';
import { AdminInfo } from '../types/admin';

export const sheetColumns = [
  { header: 'State', key: 'state', width: 12 },
  { header: 'Status', key: 'status', width: 12 },

  { header: 'Last Name', key: 'lastName', width: 18 },
  { header: 'First Name', key: 'firstName', width: 18 },
  { header: 'Title', key: 'title', width: 22 },
  { header: 'Department', key: 'department', width: 22 },
  { header: 'Agency', key: 'agency', width: 28 },

  { header: 'Address', key: 'address', width: 28 },
  { header: 'City', key: 'city', width: 18 },
  { header: 'Zip', key: 'zipCode', width: 10 },
  { header: 'Bus Phone', key: 'phone', width: 16 },
  { header: 'Cell Phone', key: 'cellPhone', width: 16 },
  { header: 'Email', key: 'email', width: 28 },

  { header: 'Board?', key: 'isBoard', width: 10 },
  { header: 'Board Role', key: 'boardRole', width: 16 },

  // Appointment
  {
    header: 'Appointing Official Title',
    key: 'appointingOfficialTitle',
    width: 26
  },
  { header: 'Appointing Executive', key: 'appointingExecutive', width: 26 },

  { header: 'Appt Date', key: 'appointmentDate', width: 16 },
  { header: 'End Term (Planned)', key: 'endOfTermPlanned', width: 18 },
  { header: 'End Term (Actual)', key: 'endOfTermActual', width: 18 },
  { header: 'Appointment Notes', key: 'appointmentNotes', width: 32 },

  // Invoicing
  { header: 'Invoice Name', key: 'invoiceName', width: 22 },
  { header: 'Invoice Address', key: 'invoiceAddress', width: 28 },
  { header: 'Invoice City', key: 'invoiceCity', width: 18 },
  { header: 'Invoice State', key: 'invoiceState', width: 10 },
  { header: 'Invoice Zip', key: 'invoiceZip', width: 10 },
  { header: 'Invoice Phone', key: 'invoicePhone', width: 16 },
  { header: 'Invoice Email', key: 'invoiceEmail', width: 26 },
  { header: 'Invoice Notes', key: 'invoiceNotes', width: 32 },

  // Admin
  { header: 'Portal Access', key: 'portalAccessGranted', width: 14 },
  { header: 'Welcome Letter', key: 'welcomeLetterSent', width: 16 },
  { header: 'Headshot On File', key: 'headshotOnFile', width: 16 },
  { header: 'Meetings By Year', key: 'meetingsByYear', width: 30 }
];

export const sheetRows = (
  m: Member,
  appointment?: AppointmentInfo,
  invoicing?: Invoicing,
  admin?: AdminInfo
) => ({
  state: m.state ?? '',
  status: m.status ?? '',

  lastName: m.lastName ?? '',
  firstName: m.firstName ?? '',
  title: m.title ?? '',
  agency: m.agency ?? '',

  address: m.address ?? '',
  city: m.city ?? '',
  zipCode: m.zipCode ?? '',
  phone: m.phone ?? '',
  cellPhone: m.cellPhone ?? '',
  email: m.email ?? '',

  isBoard: m.isBoard ? 'Yes' : '',
  boardRole: m.boardRole ?? '',

  appointingOfficialTitle: m.appointingOfficialTitle ?? '',
  appointingExecutive: m.appointingOfficial ?? '',
  appointmentDate: m.appointmentDate ?? '',
  appointmentNotes: m.notes ?? '',

  invoiceName: invoicing?.invoiceContactName ?? '',
  invoiceAddress: invoicing?.invoiceAddress ?? '',
  invoiceCity: invoicing?.invoiceCity ?? '',
  invoiceState: invoicing?.invoiceState ?? '',
  invoiceZip: invoicing?.invoiceZip ?? '',
  invoicePhone: invoicing?.invoicePhone ?? '',
  invoiceEmail: invoicing?.invoiceEmail ?? '',
  invoiceNotes: invoicing?.invoiceNotes ?? '',

  portalAccessGranted: admin?.portalAccess ? 'Yes' : '',
  welcomeLetterSent: admin?.welcomeLetterSent ? 'Yes' : '',
  headshotOnFile: admin?.headshotOnFile ? 'Yes' : '',
  meetingsByYear: admin?.meetingsAttendedByYear
    ? Object.entries(admin?.meetingsAttendedByYear)
        .map(([year, count]) => `${year}:${count}`)
        .join(', ')
    : ''
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addStyling(sheet: any) {
  const headerRow = sheet.getRow(1);

  const borderRow = [1];
  const borderColumns = [15, 21, 29];

  borderRow.forEach(rowNum => {
    const row = sheet.getRow(rowNum);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row.eachCell((cell: any) => {
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF000000' } }
      };
    });
  });

  borderColumns.forEach(colNum => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sheet.getColumn(colNum).eachCell((cell: any) => {
      cell.border = {
        right: { style: 'thin', color: { argb: 'FF000000' } }
      };
    });
  });

  for (let i = 1; i <= 15; i++) {
    const contactCells = headerRow.getCell(i);

    contactCells.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    contactCells.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00AA00' }
    };
  }

  for (let i = 16; i <= 21; i++) {
    const appointmentCells = headerRow.getCell(i);

    appointmentCells.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    appointmentCells.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF94CAE8' }
    };
  }

  for (let i = 22; i <= 29; i++) {
    const invoicingCells = headerRow.getCell(i);

    invoicingCells.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    invoicingCells.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9A1D9' }
    };
  }

  for (let i = 30; i <= 33; i++) {
    const adminCells = headerRow.getCell(i);

    adminCells.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    adminCells.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFADC8E9' }
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function freezePanes(sheet: any) {
  sheet.views = [
    {
      state: 'frozen',
      xSplit: 4
    }
  ];
}

export const removeEmptyColumns = (worksheet: ExcelJS.Worksheet) => {
  const columnsToRemove: number[] = [];

  worksheet.columns.forEach((col, index) => {
    const columnNumber = index + 1;

    let hasData = false;

    for (let row = 2; row <= worksheet.rowCount; row++) {
      const cell = worksheet.getRow(row).getCell(columnNumber).value;

      if (cell !== null && cell !== undefined && cell !== '' && cell !== ' ') {
        hasData = true;
        break;
      }
    }

    if (!hasData) {
      columnsToRemove.push(columnNumber);
    }
  });

  columnsToRemove
    .sort((a, b) => b - a)
    .forEach(colNumber => worksheet.spliceColumns(colNumber, 1));
};

export const shadeHeaderRowForFirstFiveOccupiedColumns = (
  worksheet: ExcelJS.Worksheet
) => {
  const occupiedColumns: number[] = [];

  worksheet.columns.forEach((_col, index) => {
    const colNumber = index + 1;
    let hasData = false;

    for (let row = 2; row <= worksheet.rowCount; row++) {
      const cellValue = worksheet.getRow(row).getCell(colNumber).value;

      if (
        cellValue !== null &&
        cellValue !== undefined &&
        cellValue !== '' &&
        cellValue !== ' '
      ) {
        hasData = true;
        break;
      }
    }

    if (hasData) {
      occupiedColumns.push(colNumber);
    }
  });

  const columnsToShade = occupiedColumns.slice(0, 5);

  columnsToShade.forEach(colNumber => {
    const headerCell = worksheet.getRow(1).getCell(colNumber);

    headerCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00AA00' }
    };

    headerCell.font = {
      bold: true
    };

    headerCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    };

    headerCell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
};
