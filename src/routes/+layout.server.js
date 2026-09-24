export function load({ cookies }) {
  const isTreasurer = cookies.get('treasurer_session') === 'authenticated';
  return { isTreasurer };
}