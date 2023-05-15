import { handler } from '@/shared/wrappers';
import { NextRequest, NextResponse } from 'next/server';
import { Coroutine } from '@iipekolict/coroutine';
import { storageService } from '@/services';
import { KeystoreType } from '@/constants/enums';
import { getAppDirectory, getAppSecrets } from '@/shared/functions';
import { DEFAULT_SIGN_KEYSTORE_PATH } from '@/constants/common';

type RequestContext = {
  params: {
    application: string;
  };
};

type RequestBody = {
  type?: KeystoreType;
};

export const GET = handler(async (request: NextRequest, _: unknown, context: RequestContext) => {
  const appDirectory: string = getAppDirectory(context.params.application);

  const { keystore } = await getAppSecrets(context.params.application);

  const defaultKeystoreLink: string = await storageService.getLink(DEFAULT_SIGN_KEYSTORE_PATH);
  const response: Record<string, object> = {};

  await Coroutine.launchArr(Object.keys(keystore), async (type: string) => {
    const path: string = `${appDirectory}/keystore/${type}.keystore`;
    const isExists: boolean = await storageService.isExists(path);

    response[type] = {
      secrets: keystore[type as KeystoreType],
      link: isExists ? await storageService.getLink(path) : defaultKeystoreLink,
    };
  });

  return NextResponse.json(response);
});

export const POST = handler(
  async (request: NextRequest, body: RequestBody | null, context: RequestContext) => {
    const type: KeystoreType = body?.type ?? KeystoreType.DEFAULT;

    const { keystore } = await getAppSecrets(context.params.application);

    const appDirectory: string = getAppDirectory(context.params.application);
    const keystoreSecrets = keystore[type];

    if (!keystoreSecrets) {
      throw new Error(`Bad request: ${type} keystore secrets is missing`);
    }

    const filePath: string = `${appDirectory}/keystore/${type}.keystore`;
    const isExists: boolean = await storageService.isExists(filePath);

    if (!isExists) {
      const link: string = await storageService.getLink(DEFAULT_SIGN_KEYSTORE_PATH, 1000);

      return NextResponse.json({
        secrets: keystoreSecrets,
        link,
      });
    }

    const link: string = await storageService.getLink(filePath, 1000);

    return NextResponse.json({
      secrets: keystoreSecrets,
      link,
    });
  },
);
