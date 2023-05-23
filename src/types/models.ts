import { KeystoreType } from '@/constants/enums';

type KeystoreSecrets = {
  ALIAS: string;
  ALIAS_PASSWORD: string;
  PASSWORD: string;
  FILE: string;
};

export type SecretsFile = {
  credentials: {
    NPM_ACCESS_TOKEN?: string;
  };
  keystore: {
    [Type in Partial<KeystoreType>]: KeystoreSecrets;
  };
  publishing: {
    mavenCentral: {
      SONATYPE_USERNAME: string;
      SONATYPE_PASSWORD: string;
      GPG_KEY_ID: string;
      GPG_KEY_PASSWORD: string;
      GPG_KEY: string;
    };
    npm: {
      ACCESS_TOKEN: string;
    };
  };
  build: {
    number: number;
  };
};
