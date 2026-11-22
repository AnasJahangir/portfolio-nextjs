import { NextResponse } from 'next/server';
import { getArchiveProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await getArchiveProjects();
  return NextResponse.json(projects);
}
