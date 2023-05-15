import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { GoogleAuthService, storageService } from '@/services';

type RequestContext = {
  params: {
    service: string;
  };
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  const token: string = await GoogleAuthService.generateTemporaryToken(
    await storageService.getAsJSON(`google/service-accounts/${context.params.service}.json`),
  );

  return new Response(token);
});
