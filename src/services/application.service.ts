import { SecretsFile } from '@/types/models';
import { storageService } from '@/services/index';
import { DEFAULT_SECRETS_PATH } from '@/constants/common';
import { Coroutine } from '@iipekolict/coroutine';

export class ApplicationService {
  private readonly applicationDirectory: string;
  private readonly applicationSecretsPath: string;

  private static cachedDefaultSecrets: SecretsFile | undefined;

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

  async getAppSecretsSafe<Value>(selector: (file: Partial<SecretsFile>) => Value): Promise<Value> {
    const [appSecrets, defaultSecrets] = await Coroutine.launch(
      storageService.getAsNullableJSON<Partial<SecretsFile>>(this.applicationSecretsPath),
      ApplicationService.getDefaultSecrets(),
    );

    if (!appSecrets) {
      return selector(defaultSecrets);
    }

    return selector(appSecrets) ?? selector(defaultSecrets);
  }

  async updateAppSecrets(updatedSecrets: Partial<SecretsFile>) {
    await storageService.save(this.applicationSecretsPath, JSON.stringify(updatedSecrets, null, 2));
  }

  static async getDefaultSecrets(): Promise<SecretsFile> {
    if (this.cachedDefaultSecrets) {
      return this.cachedDefaultSecrets;
    }

    this.cachedDefaultSecrets = await storageService.getAsJSON<SecretsFile>(DEFAULT_SECRETS_PATH);
    return this.cachedDefaultSecrets;
  }
}
