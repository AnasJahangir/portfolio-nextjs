import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { TABLES, createRow, listRows } from '@/lib/db';

export const dynamic = 'force-dynamic';

function badTable(resource) {
  return !TABLES[resource];
}

export async function GET(request, { params }) {
  const { resource } = await params;
  if (badTable(resource)) return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  try {
    const rows = await listRows(resource);
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { resource } = await params;
  if (badTable(resource)) return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
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
    const result = await createRow(resource, body);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
