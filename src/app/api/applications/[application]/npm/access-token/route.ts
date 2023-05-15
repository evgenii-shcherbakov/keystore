import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { ApplicationService } from '@/services';

type RequestContext = {
  params: {
    application: string;
  };
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  const applicationService = new ApplicationService(context.params.application);

  const { credentials } = await applicationService.getAppSecretsSafe();

  if (!credentials?.NPM_ACCESS_TOKEN) {
    throw new Error('Bad request: NPM_ACCESS_TOKEN is not provided');
  }

  return new Response(credentials.NPM_ACCESS_TOKEN);
});
