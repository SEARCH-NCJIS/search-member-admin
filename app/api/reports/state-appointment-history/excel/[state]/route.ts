import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { stateSlug: string } }
) {
  const slug = params.stateSlug;
  const rawState = slug.replace(/-/, ' ');
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
