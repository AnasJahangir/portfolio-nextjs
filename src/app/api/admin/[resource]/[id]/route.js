import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { TABLES, deleteRow, updateRow } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const { resource, id } = await params;
  if (!TABLES[resource]) return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  if (TABLES[resource].readOnly) {
    return NextResponse.json({ error: 'This table is read-only.' }, { status: 405 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  try {
    await updateRow(resource, id, body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { resource, id } = await params;
  if (!TABLES[resource]) return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  try {
    await deleteRow(resource, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
