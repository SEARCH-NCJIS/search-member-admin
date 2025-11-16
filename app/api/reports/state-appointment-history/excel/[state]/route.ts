import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import ExcelJS from 'exceljs';
import {
  sheetColumns,
  sheetRows,
  removeEmptyColumns,
  shadeHeaderRowForFirstFiveOccupiedColumns
} from '@/app/utils/excelHelper';
import type { AppointmentHistory } from '@/app/types/appointmentHistory';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: { state: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('test');

    const slug = params.state;
    const stateName = slug
      .replace(/-/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();

    const data = await db
      .collection<AppointmentHistory>('appointmentHistory')
      .find({
        state: { $regex: new RegExp(`^${stateName}$`, 'i') }
      })
      .toArray();

    const parseAppointmentDate = (value?: string | null): number => {
      if (!value) return 0;
      const parts = value.split('/');
      if (parts.length !== 3) return 0;

      const [m, d, yyRaw] = parts.map(p => p.trim());
      const month = Number(m);
      const day = Number(d);
      const yy = Number(yyRaw);

      if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(yy)) {
        return 0;
      }

      const year = yy >= 70 ? 1900 + yy : 2000 + yy;
      const date = new Date(year, month - 1, day);
      if (Number.isNaN(date.getTime())) return 0;

      return date.getTime();
    };

    data.sort(
      (a, b) =>
        parseAppointmentDate(b.appointmentDate) -
        parseAppointmentDate(a.appointmentDate)
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(
      `Appointment History for ${stateName} Members`
    );

    sheet.columns = sheetColumns;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sheet.addRows(data.map(doc => sheetRows((doc as any).member || doc)));

    removeEmptyColumns(sheet);
    shadeHeaderRowForFirstFiveOccupiedColumns(sheet);

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="state_members_appointment_history_${stateName}.xlsx"`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (_error) {
    return new NextResponse('Failed to generate report', {
      status: 500
    });
  }
}
