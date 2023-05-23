import { handler } from '@/shared/wrappers';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationService } from '@/services';
import { SecretsFile } from '@/types/models';

enum Format {
  JSON = 'json',
  MAVEN_ENV_STRING = 'maven-env-string',
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

const parseForMavenPublishing = (credentials: Credentials): string => {
  const rows: string[] = [
    `ORG_GRADLE_PROJECT_mavenCentralUsername=${credentials.SONATYPE_USERNAME}`,
    `ORG_GRADLE_PROJECT_mavenCentralPassword=${credentials.SONATYPE_PASSWORD}`,
    `ORG_GRADLE_PROJECT_signingInMemoryKeyId=${credentials.GPG_KEY_ID}`,
    `ORG_GRADLE_PROJECT_signingInMemoryKeyPassword=${credentials.GPG_KEY_PASSWORD}`,
    `ORG_GRADLE_PROJECT_signingInMemoryKey=${credentials.GPG_KEY}`,
  ];

  return rows.join(' ');
};

const generateResponse = (
  credentials: Credentials,
  format: Format = Format.JSON,
): Response | NextResponse => {
  switch (format) {
    case Format.MAVEN_ENV_STRING:
      return new Response(parseForMavenPublishing(credentials));
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
