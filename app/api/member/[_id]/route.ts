import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const { _id } = params;

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

    // Convert parameter to Mongo ObjectId
    const objectId = new ObjectId(_id);

    const member = await db
      .collection('stateMembers')
      .findOne({ _id: objectId });

    if (!member) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (e) {
    console.error('ERROR:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
