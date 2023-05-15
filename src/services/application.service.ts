import { SecretsFile } from '@/types/models';
import { storageService } from '@/services/index';
import { DEFAULT_SECRETS_PATH } from '@/constants/common';

export class ApplicationService {
  private readonly applicationDirectory: string;
  private readonly applicationSecretsPath: string;

  constructor(application: string) {
    this.applicationDirectory = `apps/${application}`;
    this.applicationSecretsPath = `${this.applicationDirectory}/secrets.json`;
  }

  get appDirectory(): string {
    return this.applicationDirectory;
  }

  async getAppSecrets(): Promise<Partial<SecretsFile>> {
    return storageService.getAsJSON(this.applicationSecretsPath);
  }

  async getAppSecretsSafe(): Promise<Partial<SecretsFile>> {
    const appSecrets: Partial<SecretsFile> | null = await storageService.getAsNullableJSON(
      this.applicationSecretsPath,
    );

    return appSecrets ?? (await ApplicationService.getDefaultSecrets());
  }

  async updateAppSecrets(updatedSecrets: Partial<SecretsFile>) {
    await storageService.save(this.applicationSecretsPath, JSON.stringify(updatedSecrets, null, 2));
  }

  static async getDefaultSecrets(): Promise<SecretsFile> {
    return storageService.getAsJSON(DEFAULT_SECRETS_PATH);
  }
}
