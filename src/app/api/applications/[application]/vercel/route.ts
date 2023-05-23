import { handler } from '@/shared/wrappers';
import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/services';
import { Coroutine } from '@evgenii-shcherbakov/coroutine';

enum Target {
  PROJECT = 'project.json',
  VERCEL = 'vercel.json',
}

type RequestContext = {
  params: {
    application: string;
  };
};

type RequestBody = {
  target?: Target;
};

export const GET = handler(async (request: NextRequest, _: unknown, { params }: RequestContext) => {
  const directoryPath: string = `apps/${params.application}/vercel`;
  const vercelJsonPath: string = `${directoryPath}/${Target.VERCEL}`;
  const projectJsonPath: string = `${directoryPath}/${Target.PROJECT}`;

  const [hasVercelJson, hasProjectJson] = await Coroutine.launch(
    storageService.isExists(vercelJsonPath),
    storageService.isExists(projectJsonPath),
  );

  const [vercelJson, projectJson] = await Coroutine.launch(
    (async () => (hasVercelJson ? storageService.getAsJSON(vercelJsonPath) : null))(),
    (async () => (hasProjectJson ? storageService.getAsJSON(projectJsonPath) : null))(),
  );

  return NextResponse.json({
    vercelJson,
    projectJson,
    rawVercelJson: vercelJson ? JSON.stringify(vercelJson) : '',
    rawProjectJson: projectJson ? JSON.stringify(projectJson) : '',
  });
});

export const POST = handler(
  async (request: NextRequest, body: RequestBody | null, { params }: RequestContext) => {
    const path: string = `apps/${params.application}/vercel/${body?.target ?? Target.PROJECT}`;
    return NextResponse.json(await storageService.getAsJSON(path));
  },
);
