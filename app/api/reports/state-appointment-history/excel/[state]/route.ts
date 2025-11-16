import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import {
  sheetColumns,
  sheetRows,
  addStyling,
  freezePanes
} from '@/app/utils/excelHelper';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ state: string }> }
) {
  const { state } = await params;
  const rawState = state.replace(/-/g, ' ');
  const normalized = rawState.trim().replace(/\s+/g, ' ');

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);

  const data = await db
    .collection('appointmentHistory')
    .find({
      state: {
        $regex: `^\\s*${normalized.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        )}\\s*$`,
        $options: 'i'
      }
    })
    .sort({ appointmentDate: -1 })
    .toArray();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Emeritus Members');

  sheet.columns = sheetColumns;
  sheet.addRows(
    data.map(doc =>
      sheetRows(
        doc.member || doc,
        doc.appointmentInfo || {},
        doc.invoicing || {},
        doc.adminInfo || {}
      )
    )
  );

  //   Add Styling

  addStyling(sheet);

  // Freeze Panes
  freezePanes(sheet);

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="appointment_history_${state}.xlsx"`,
      'Cache-Control': 'no-store'
    }
  });
}
