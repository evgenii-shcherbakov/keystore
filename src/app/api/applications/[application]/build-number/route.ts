import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { SecretsFile } from '@/types/models';
import { ApplicationService } from '@/services';

type RequestBody = {
  value?: number;
};

type RequestContext = {
  params: {
    application: string;
  };
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  const applicationService = new ApplicationService(context.params.application);

  const { build } = await applicationService.getAppSecrets();

  if (typeof build?.number !== 'number') {
    throw new Error('Bad request: build number value is missing');
  }

  return new Response(build.number.toString());
});

export const PATCH = handler(
  async (request: NextRequest, body: RequestBody | null, context: RequestContext) => {
    const incrementValue: number = body?.value ?? 1;
    const applicationService = new ApplicationService(context.params.application);

    const secrets: Partial<SecretsFile> = await applicationService.getAppSecrets();

    if (!secrets.build?.number) {
      throw new Error('Bad request: build number value is missing');
    }

    const buildNumber: number = secrets.build.number + incrementValue;

    await applicationService.updateAppSecrets({
      ...secrets,
      build: { ...secrets.build, number: buildNumber },
    });

    return new Response(buildNumber.toString());
  },
);
