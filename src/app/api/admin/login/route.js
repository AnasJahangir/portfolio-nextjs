import { NextResponse } from 'next/server';
import { createSessionToken, isAdminConfigured, sessionCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'Admin password is not configured on the server (set ADMIN_PASSWORD).' },
      { status: 500 },
    );
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }
  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie.name, token, sessionCookie.options);
  return res;
}
