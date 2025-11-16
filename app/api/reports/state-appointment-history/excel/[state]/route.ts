import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

//TODO: FIX. RE{PRTOMG OSSIE}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ state: string }> }
) {
  const { state } = await params;
  const rawState = state.replace(/-/g, ' ');
  const normalized = rawState.trim().replace(/\s+/g, ' ');

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);

  const appointmentHistory = await db
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

  return NextResponse.json({ appointmentHistory });
}
