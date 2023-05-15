import { SecretsFile } from '@/types/models';
import { storageService } from '@/services';
import { DEFAULT_SECRETS_PATH } from '@/constants/common';

export const getAppDirectory = (app: string): string => `apps/${app}`;

export const getDefaultSecrets = async (): Promise<SecretsFile> => {
  return storageService.getAsJSON(DEFAULT_SECRETS_PATH);
};

export const getAppSecrets = async (app: string): Promise<SecretsFile> => {
  const appSecrets: SecretsFile | null = await storageService.getAsNullableJSON(
    `${getAppDirectory(app)}/secrets.json`,
  );

  return appSecrets ?? (await getDefaultSecrets());
};
