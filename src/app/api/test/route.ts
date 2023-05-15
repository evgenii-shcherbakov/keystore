import { handler } from '@/shared/wrappers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = handler(async (request: NextRequest, body: any | null) => {
  return NextResponse.json(body ?? {});
});
