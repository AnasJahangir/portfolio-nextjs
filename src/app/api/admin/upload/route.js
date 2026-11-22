import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdminRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image uploads are not configured (set BLOB_READ_WRITE_TOKEN). Paste a cover-image URL instead.' },
      { status: 400 },
    );
  }
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }
  const folder = String(form.get('folder') || 'project-covers');
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const blob = await put(`${folder}/${Date.now()}-${safeName}`, file, {
    access: 'public',
  });
  return NextResponse.json({ url: blob.url });
}
