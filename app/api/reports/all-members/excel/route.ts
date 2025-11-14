import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import ExcelJS from 'exceljs';
import {
  sheetColumns,
  sheetRows,
  addStyling,
  freezePanes
} from '@/app/utils/excelHelper';
import type { Member } from '@/app/types/member';
import type { AppointmentInfo } from '@/app/types/appointmentInfo';
import type { Invoicing } from '@/app/types/invoicing';
import type { AdminInfo } from '@/app/types/admin';

export const dynamic = 'force-dynamic';

type Category = 'state' | 'atLarge' | 'emeritus';

function getCategoryRank(category: Category) {
  switch (category) {
    case 'state':
      return 0;
    case 'atLarge':
      return 1;
    case 'emeritus':
      return 2;
  }
}

export async function GET() {
  // 1) Connect to DB
  const client = await clientPromise;
  const db = client.db('test');
  console.log('🚀 Connected to database');

  // 2) Pull each collection
  const [stateMembers, atLargeMembers, emeritusMembers] = await Promise.all([
    db.collection('stateMembers').find({}).toArray(),
    db.collection('atLarge').find({}).toArray(),
    db.collection('emeritus').find({}).toArray()
  ]);

  // 3) Normalize docs into a single consistent shape in memory
  type CombinedRow = {
    member: Member;
    appointmentInfo: AppointmentInfo;
    invoicing: Invoicing;
    adminInfo: AdminInfo;
    category: Category;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalize = (docs: any[], category: Category): CombinedRow[] =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs.map((doc: any) => {
      const member: Member = (doc.member ?? doc) as Member;
      const appointmentInfo: AppointmentInfo = (doc.appointmentInfo ??
        {}) as AppointmentInfo;
      const invoicing: Invoicing = (doc.invoicing ?? {}) as Invoicing;
      const adminInfo: AdminInfo = (doc.adminInfo ?? {}) as AdminInfo;

      return {
        member: {
          ...member,
          // For at-large / emeritus, force a display state label
          state:
            category === 'state'
              ? member.state
              : category === 'atLarge'
              ? 'At-Large'
              : 'Emeritus'
        },
        appointmentInfo,
        invoicing,
        adminInfo,
        category
      };
    });

  const combined: CombinedRow[] = [
    ...normalize(stateMembers, 'state'),
    ...normalize(atLargeMembers, 'atLarge'),
    ...normalize(emeritusMembers, 'emeritus')
  ];

  // 4) Sort: category order → state → lastName → firstName
  combined.sort((a, b) => {
    const rankDiff = getCategoryRank(a.category) - getCategoryRank(b.category);
    if (rankDiff !== 0) return rankDiff;

    const stateDiff = (a.member.state ?? '').localeCompare(
      b.member.state ?? ''
    );
    if (stateDiff !== 0) return stateDiff;

    const lastDiff = (a.member.lastName ?? '').localeCompare(
      b.member.lastName ?? ''
    );
    if (lastDiff !== 0) return lastDiff;

    return (a.member.firstName ?? '').localeCompare(b.member.firstName ?? '');
  });

  console.log('Rows in combined export:', combined.length);

  // 5) Build workbook
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('All Members');

  sheet.columns = sheetColumns;

  sheet.addRows(
    combined.map(row =>
      sheetRows(row.member, row.appointmentInfo, row.invoicing, row.adminInfo)
    )
  );

  // Styling + freeze panes
  addStyling(sheet);
  freezePanes(sheet);

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="All_Members.xlsx"',
      'Cache-Control': 'no-store'
    }
  });
}
