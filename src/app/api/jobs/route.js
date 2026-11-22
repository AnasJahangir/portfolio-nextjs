import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json(jobs);
}
