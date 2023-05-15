import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/services';
import { handler } from '@/shared/wrappers';
import { parse } from 'dotenv';
import { Coroutine } from '@iipekolict/coroutine';

enum Format {
  RAW = 'raw',
  JSON = 'json',
}

enum Stage {
  DEFAULT = '',
  LOCAL = 'local',
  DEV = 'dev',
  STAGE = 'stage',
  PROD = 'prod',
}

type RequestContext = {
  params: {
    application: string;
  };
};

type RequestBody = {
  format?: Format;
  stage?: Stage;
};

const STAGES: Stage[] = [Stage.DEFAULT, Stage.LOCAL, Stage.DEV, Stage.STAGE, Stage.PROD];

export const GET = handler(async (request: NextRequest, _: unknown, { params }: RequestContext) => {
  const stagesData = await Coroutine.launchArr(STAGES, async (stage: Stage) => {
    const raw: string | null = await storageService.getAsNullableString(
      `apps/${params.application}/${stage}.env`,
    );

    if (!raw) return undefined;

    return {
      raw,
      json: parse(raw),
    };
  });

  return NextResponse.json(
    Object.keys(stagesData).reduce(
      (acc: Record<string, object | undefined>, stage: string, index: number) => {
        acc[stage] = stagesData[index];
        return acc;
      },
      {},
    ),
  );
});

export const POST = handler(
  async (request: NextRequest, body: RequestBody | null, { params }: RequestContext) => {
    const filePath: string = `apps/${params.application}/${body?.stage ?? ''}.env`;
    const fileContent: string = await storageService.getAsString(filePath);

    switch (body?.format) {
      case Format.JSON:
        return NextResponse.json(parse(fileContent));
      default:
        return new Response(fileContent);
    }
  },
);
