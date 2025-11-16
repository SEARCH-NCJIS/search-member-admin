import clientPromise from '@/app/lib/mongodb';
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { stateSlug: string } }
) {
  // const session = await auth();
  // if (!session)
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = await params.stateSlug;
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

  console.log('Appointment History: ', appointmentHistory);

  return NextResponse.json({ appointmentHistory });
}
