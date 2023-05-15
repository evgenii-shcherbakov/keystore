import { NextRequest } from 'next/server';
import { storageService } from '@/services';
import { handler } from '@/shared/wrappers';

enum Platform {
  ANDROID = 'android',
  WEB = 'web',
  IOS = 'ios',
  MACOS = 'macos',
  WINDOWS = 'windows',
  LINUX = 'linux',
}

enum Parser {
  DART = 'dart',
}

type RequestContext = {
  params: {
    application: string;
  };
};

type RequestBody = {
  platform: Platform;
  parser?: Parser;
};

const parseBuildArguments = (file: string, parser?: Parser): string => {
  switch (parser) {
    case Parser.DART:
    default:
      return file
        .split('\n')
        .reduce(
          (acc: string, row: string): string => (row ? acc + `--dart-define=${row} ` : acc),
          '',
        )
        .trim();
  }
};

export const POST = handler(
  async (request: NextRequest, body: RequestBody | null, context: RequestContext) => {
    if (!body || !body.platform) {
      throw new Error('Invalid request body');
    }

    const path: string = `apps/${context.params.application}/build-arguments/${body.platform}.txt`;
    const file: string = await storageService.getAsString(path);

    return new Response(parseBuildArguments(file, body?.parser));
  },
);
