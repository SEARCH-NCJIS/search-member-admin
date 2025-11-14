import clientPromise from '@/app/lib/mongodb';
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  // const session = await auth();
  // if (!session)
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  const atLarge = await db
    .collection('atLarge')
    .find({})
    .sort({ state: 1 })
    .limit(500)
    .toArray();

  console.log(atLarge);

  return NextResponse.json({ atLarge });
}
