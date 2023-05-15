import { handler } from '@/shared/wrappers';
import { NextRequest } from 'next/server';
import { storageService } from '@/services';

type RequestBody = {
  value?: number;
};

type RequestContext = {
  params: {
    application: string;
  };
};

const getPath = (context: RequestContext): string => {
  return `${context.params.application}/build-number.txt`;
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  return new Response(await storageService.getAsString(getPath(context)));
});

export const PATCH = handler(
  async (request: NextRequest, body: RequestBody | null, context: RequestContext) => {
    const incrementValue: number = body?.value ?? 1;

    const path: string = getPath(context);

    const buildNumber: string = (
      +(await storageService.getAsString(path)) + incrementValue
    ).toString();

    await storageService.save(path, buildNumber);
    return new Response(buildNumber);
  },
);
