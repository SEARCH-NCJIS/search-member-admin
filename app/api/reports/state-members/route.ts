import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

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
    .collection('members')
    .find({ status: 'Active' })
    .sort({ state: 1, lastName: 1, firstName: 1 })
    .toArray();

  const members = data.map(member => ({
    ...member,
    _id: member._id?.toString() ?? ''
  }));

  return NextResponse.json(members);
}
