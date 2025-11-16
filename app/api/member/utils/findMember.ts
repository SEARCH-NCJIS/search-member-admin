import type { Db, Collection } from 'mongodb';
import { ObjectId } from 'mongodb';

type FoundMember = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any;
  collection: Collection;
  collectionName: string;
};

const MEMBER_COLLECTIONS = ['stateMembers', 'atLarge', 'emeritus'];

export async function findMemberInAnyCollection(
  db: Db,
  memberId: string
): Promise<FoundMember | null> {
  const _id = new ObjectId(memberId);

  for (const name of MEMBER_COLLECTIONS) {
    const collection = db.collection(name);
    const doc = await collection.findOne({ _id });
    if (doc) {
      return { doc, collection, collectionName: name };
    }
  }

  return null;
}
