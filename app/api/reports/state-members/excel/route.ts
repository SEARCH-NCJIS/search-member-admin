import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import ExcelJS from 'exceljs';
import {
  sheetColumns,
  sheetRows,
  addStyling,
  freezePanes
} from '@/app/utils/excelHelper';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbconnect = async () => {
    try {
      const client = await clientPromise;
      const db = client.db('test');
      console.log('🚀 Connected to database');
      return db;
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  };

  const db = await dbconnect();

  const data = await db
    .collection('stateMembers')
    .find()
    .sort({ state: 1, lastName: 1, firstName: 1 })
    .toArray();

  console.log('Data fetched for Excel report:', data.length, 'records');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Current Members');

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
      'Content-Disposition': 'attachment; filename="state_members.xlsx"',
      'Cache-Control': 'no-store'
    }
  });
}
