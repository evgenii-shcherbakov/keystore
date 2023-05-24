import { handler } from '@/shared/wrappers';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationService } from '@/services';
import { SecretsFile } from '@/types/models';

enum Format {
  JSON = 'json',
  GRADLE_PROPERTIES = 'gradle-properties',
}

type RequestContext = {
  params: {
    application: string;
  };
};

type RequestBody = {
  format: Format;
};

type Credentials = SecretsFile['publishing']['mavenCentral'];

const convertToGradleProperties = (credentials: Credentials): string => {
  const rows: string[] = [
    `mavenCentralUsername=${credentials.SONATYPE_USERNAME}`,
    `mavenCentralPassword=${credentials.SONATYPE_PASSWORD}`,
    `signingInMemoryKeyId=${credentials.GPG_KEY_ID}`,
    `signingInMemoryKeyPassword=${credentials.GPG_KEY_PASSWORD}`,
    `signingInMemoryKey=${credentials.GPG_KEY}`,
  ];

  return rows.join('\n');
};

const generateResponse = (
  credentials: Credentials,
  format: Format = Format.JSON,
): Response | NextResponse => {
  switch (format) {
    case Format.GRADLE_PROPERTIES:
      return new Response(convertToGradleProperties(credentials));
    case Format.JSON:
    default:
      return NextResponse.json(credentials);
  }
};

export const POST = handler(
  async (request: NextRequest, body: RequestBody | null, context: RequestContext) => {
    const applicationService = new ApplicationService(context.params.application);

    const credentials = await applicationService.getAppSecretsSafe(
      ({ publishing }) => publishing?.mavenCentral,
    );

    if (!credentials) {
      throw new Error('Bad request: Maven Central credentials are not present');
    }

    return generateResponse(credentials, body?.format);
  },
);
