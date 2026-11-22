import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { createRow, ensureTables, listRows } from '@/lib/db';
import { seedArchiveProjects, seedFeaturedProjects, seedJobs } from '@/lib/seed';

export const dynamic = 'force-dynamic';

// One-time seed: copies the built-in seed content (Anas's real projects,
// jobs and archive entries) into the connected Turso database, but only
// into tables that are still empty. Never overwrites existing rows.
// Testimonials are intentionally never seeded — empty until real ones
// are added in /admin.
export async function POST(request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  try {
    await ensureTables();
    const plan = [
      { table: 'jobs', rows: seedJobs },
      { table: 'featured_projects', rows: seedFeaturedProjects },
      { table: 'archive_projects', rows: seedArchiveProjects },
    ];
    const result = {};
    for (const { table, rows } of plan) {
      const existing = await listRows(table);
      if (existing.length > 0) {
        result[table] = { seeded: 0, skipped: 'not empty' };
        continue;
      }
      let count = 0;
      for (const row of rows) {
        const { id, created_at, ...data } = row;
        await createRow(table, data);
        count += 1;
      }
      result[table] = { seeded: count, skipped: null };
    }
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
