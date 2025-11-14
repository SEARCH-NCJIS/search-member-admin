// app/api/members/all/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import type { Member } from '@/app/types/member';

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
    default:
      return 99;
  }
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // 1) Fetch from all three collections in parallel
  const [stateMembers, atLargeMembers, emeritusMembers] = await Promise.all([
    db.collection<Member>('stateMembers').find({}).toArray(),
    db.collection<Member>('atLarge').find({}).toArray(),
    db.collection<Member>('emeritus').find({}).toArray()
  ]);

  // 2) Normalize & tag each record with a category
  const withCategory = (
    members: Member[],
    category: Category
  ): (Member & { category: Category })[] =>
    members.map(m => ({
      ...m,
      category,
      // If you "forgot" to set a state value in DB for at-large / emeritus,
      // we override it here purely for display/grouping purposes.
      state:
        category === 'state'
          ? m.state
          : category === 'atLarge'
          ? 'At-Large'
          : 'Emeritus'
    }));

  const combined: (Member & { category: Category })[] = [
    ...withCategory(stateMembers, 'state'),
    ...withCategory(atLargeMembers, 'atLarge'),
    ...withCategory(emeritusMembers, 'emeritus')
  ];

  // 3) Sort:
  //    - category: state (0) → atLarge (1) → emeritus (2)
  //    - for state members: by state, then lastName, then firstName
  //    - for atLarge/emeritus: just by lastName, then firstName
  combined.sort((a, b) => {
    const rankDiff = getCategoryRank(a.category) - getCategoryRank(b.category);
    if (rankDiff !== 0) return rankDiff;

    if (a.category === 'state' && b.category === 'state') {
      const stateDiff = (a.state ?? '').localeCompare(b.state ?? '');
      if (stateDiff !== 0) return stateDiff;
    }

    const lastDiff = (a.lastName ?? '').localeCompare(b.lastName ?? '');
    if (lastDiff !== 0) return lastDiff;

    return (a.firstName ?? '').localeCompare(b.firstName ?? '');
  });

  return NextResponse.json({ members: combined });
}
