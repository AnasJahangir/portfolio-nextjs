import { NextResponse } from 'next/server';
import { isAdminRequest, isAdminConfigured } from '@/lib/auth';
import { isDbConnected } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const authenticated = await isAdminRequest(request);
  return NextResponse.json({
    authenticated,
    adminConfigured: isAdminConfigured(),
    dbConnected: isDbConnected(),
  });
}
