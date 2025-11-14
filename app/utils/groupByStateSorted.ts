import { Member } from '@/app/types/member';

export function groupByStateSorted(
  stateMember: Member[]
): [string, Member[]][] {
  // Normalize, then sort by state asc, lastName asc, firstName asc
  const copy = [...stateMember].sort((a, b) => {
    const sa = (a.state || '').localeCompare(b.state || '');
    if (sa !== 0) return sa;
    const ln = a.lastName.localeCompare(b.lastName);
    if (ln !== 0) return ln;
    return a.firstName.localeCompare(b.firstName);
  });
  const map = new Map<string, Member[]>();
  for (const m of copy) {
    const key = m.state || '—';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }
  // Return sorted by state key
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}
