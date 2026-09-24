import { db } from '$lib/server/db';

export async function POST({ request, cookies }) {
  const session = cookies.get('treasurer_session');
  if (session != "authenticated") {
    return Response.json({ error: "Unauthorized"}, {status: 401})
  }

  const { student_id, amount, payment_type } = await request.json();

  if (!student_id || !amount) {
    return Response.json({ error: 'Student and amount required' }, { status: 400 });
  }

  db.query(`
    INSERT INTO payments (student_id, amount, payment_type)
    VALUES (?, ?, ?)
  `).run(Number(student_id), Number(amount), payment_type || null);

  return Response.json({ success: true });
}