import { NextResponse } from 'next/server';
import { getFeaturedProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await getFeaturedProjects();
  return NextResponse.json(projects);
}
