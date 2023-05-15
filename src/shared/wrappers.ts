import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/services';

const attachCorsHeaders = (response: Response | NextResponse): Response | NextResponse => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
};

export const handler = (
  handler: (
    request: NextRequest,
    body: any | null,
    context: any,
  ) => Promise<Response | NextResponse>,
) => {
  return async (request: NextRequest, context: any): Promise<Response | NextResponse> => {
    try {
      jwtService.checkAccess(request);
      const body = request.body ? await request.json() : null;
      return attachCorsHeaders(await handler(request, body, context));
    } catch (error: any) {
      return attachCorsHeaders(
        NextResponse.json({ message: error['message'] ?? 'Unknown error' }, { status: 500 }),
      );
    }
  };
};
