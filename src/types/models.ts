import { KeystoreType } from '@/constants/enums';

type KeystoreSecrets = {
  ALIAS: string;
  ALIAS_PASSWORD: string;
  PASSWORD: string;
};

export type SecretsFile = {
  credentials: {
    NPM_ACCESS_TOKEN?: string;
  };
  keystore: {
    [Type in Partial<KeystoreType>]: KeystoreSecrets;
  };
  build: {
    number: number;
  };
};
