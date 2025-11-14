export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function prettyStateFromSlug(slug: string) {
  return slug
    .split('-') // "new-york" -> ["new", "york"]
    .map(
      part => part.charAt(0).toUpperCase() + part.slice(1) // "new" -> "New"
    )
    .join(' '); // ["New","York"] -> "New York"
}
