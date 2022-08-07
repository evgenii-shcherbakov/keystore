import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { GoogleAuthService, storageService } from '@/services';

enum Account {
  PUB_DEV = 'pub-dev',
  LIBRARIES_ADMIN = 'libraries-admin',
}

type RequestBody = {
  account?: Account;
  url?: string;
};

export const POST = handler(async (request: NextRequest, body: RequestBody | null) => {
  if (!body?.url || !body?.account) {
    throw new Error('Bad request: url or account are not provided');
  }

  const token: string = await GoogleAuthService.generateTemporaryToken(
    await storageService.getAsJSON(`google/service-accounts/${body.account}.json`),
    body.url,
  );

  return new Response(token);
});
