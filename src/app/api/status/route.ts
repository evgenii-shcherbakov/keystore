import { handler } from '@/shared/wrappers';
import { NextResponse } from 'next/server';

export const GET = handler(async () => {
  return NextResponse.json({ status: 'ok' });
});
