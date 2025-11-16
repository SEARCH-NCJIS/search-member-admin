// TODO: Merge the At-Large and State Members collections into a single Members collection.
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { findMemberInAnyCollection } from '../../member/utils/findMember';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

// update user details

export async function PATCH(
  req: Request,
  { params }: { params: { _id: string } }
) {
  const client = await clientPromise;
  const db = client.db('test');

  try {
    const body = await req.json();

    console.log('Member: ', body);

    const found = await findMemberInAnyCollection(db, params._id);
    if (!found) {
      return new NextResponse('Member not found', { status: 404 });
    }

    const { collection } = found;

    const update: Record<string, unknown> = {};

    const {
      _id,
      firstName,
      lastName,
      title,
      state,
      email,
      address,
      city,
      zipCode,
      isBoard,
      boardRole,
      tags,
      notes,
      endOfTerm,
      alternate,
      businessPhone,
      cellPhone,
      photoUrl,
      appointingOfficial,
      appointingOfficialTitle,
      appointmentDate
    } = body as {
      _id: string;
      firstName: string;
      lastName: string;
      title: string;
      state: string;
      email: string;
      address: string;
      city: string;
      zipCode: string;
      isBoard: boolean;
      boardRole: string;
      tags: string[];
      notes: string;
      endOfTerm: Date;
      alternate: string;
      businessPhone: string;
      cellPhone: string;
      photoUrl: string;
      appointingOfficial: string;
      appointingOfficialTitle: string;
      appointmentDate: Date;
    };

    if (title !== undefined) update.title = title;
    if (firstName !== undefined) update.firstName = firstName;
    if (lastName !== undefined) update.lastName = lastName;
    if (state !== undefined) update.state = state;
    if (email !== undefined) update.email = email;
    if (address !== undefined) update.address = address;
    if (city !== undefined) update.city = city;
    if (zipCode !== undefined) update.zipCode = zipCode;
    if (isBoard !== undefined) update.isBoard = isBoard;
    if (boardRole !== undefined) update.boardRole = boardRole;
    if (tags !== undefined) update.tags = tags;
    if (notes !== undefined) update.notes = notes;
    if (endOfTerm !== undefined) update.endOfTerm = endOfTerm;
    if (alternate !== undefined) update.alternate = alternate;
    if (businessPhone !== undefined) update.businessPhone = businessPhone;
    if (cellPhone !== undefined) update.cellPhone = cellPhone;
    if (photoUrl !== undefined) update.photoUrl = photoUrl;
    if (appointingOfficial !== undefined)
      update.appointingOfficial = appointingOfficial;
    if (appointingOfficialTitle !== undefined)
      update.appointingOfficialTitle = appointingOfficialTitle;
    if (appointmentDate !== undefined) update.appointmentDate = appointmentDate;
    if (endOfTerm !== undefined) update.endOfTerm = endOfTerm;
    if (alternate !== undefined) update.alternate = alternate;

    if (Object.keys(update).length === 0) {
      return new NextResponse('No fields to update', { status: 400 });
    }

    const result = await collection.updateOne(
      { _id: found.doc._id },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return new NextResponse('No records were updated', { status: 404 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('ERROR:', error);
    return new NextResponse('Failed to update the member', { status: 500 });
  }
}
