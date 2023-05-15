import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { getAppSecrets } from '@/shared/functions';

type RequestContext = {
  params: {
    application: string;
  };
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  const { NPM_ACCESS_TOKEN } = await getAppSecrets(context.params.application);
  return new Response(NPM_ACCESS_TOKEN);
});
