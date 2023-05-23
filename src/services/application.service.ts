import { SecretsFile } from '@/types/models';
import { storageService } from '@/services/index';
import { DEFAULT_SECRETS_DIRECTORY, DEFAULT_SECRETS_PATH } from '@/constants/common';
import { Coroutine } from '@evgenii-shcherbakov/coroutine';
import { join } from 'path';

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
    return ApplicationService.parseLinks(
      this.applicationDirectory,
      await storageService.getAsJSON<Partial<SecretsFile>>(this.applicationSecretsPath),
    );
  }

  async getAppSecretsSafe<Value>(selector: (file: Partial<SecretsFile>) => Value): Promise<Value> {
    const [appSecrets, defaultSecrets] = await Coroutine.launch(
      storageService.getAsNullableJSON<Partial<SecretsFile>>(this.applicationSecretsPath),
      ApplicationService.getDefaultSecrets(),
    );

    if (!appSecrets) {
      return ApplicationService.parseLinks<Value>(
        DEFAULT_SECRETS_DIRECTORY,
        selector(defaultSecrets),
      );
    }

    const applicationValue: Value | undefined = selector(appSecrets);

    const directory: string = applicationValue
      ? this.applicationDirectory
      : DEFAULT_SECRETS_DIRECTORY;

    return ApplicationService.parseLinks<Value>(
      directory,
      applicationValue ?? selector(defaultSecrets),
    );
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

  private static readonly INTERPOLATION_REGEXP = /{{(\s?|\s+)[\w\d\\\/\.\-\_]+(\s?|\s+)}}/gi;

  private static readonly CLEAR_INTERPOLATION_REGEXP =
    /(\s?|s+)({{)(\s?|s+)|(\s?|s+)(}})(\s?|s+)/gi;

  private static async parseLink<Input = any>(path: string, value: any): Promise<Input> {
    if (typeof value === 'string' && this.INTERPOLATION_REGEXP.test(value)) {
      const link: string = value.replace(this.CLEAR_INTERPOLATION_REGEXP, '');
      return (await storageService.getAsString(join(path, link))) as Input;
    }

    return value;
  }

  private static async parseLinks<Original = any>(
    path: string,
    block: Original | string,
  ): Promise<Original> {
    if (typeof block === 'string') {
      return this.parseLink(path, block);
    }

    if (typeof block !== 'object' || block === null) {
      return block;
    }

    const handleObject = async <Input extends Record<string, any> = Record<string, any>>(
      object: Input,
    ): Promise<Input> => {
      await Coroutine.launchArr(Object.keys(object), async (key: string) => {
        const value: any = object[key];

        (object as any)[key] =
          typeof value === 'object' && value !== null
            ? await handleObject(object[key])
            : await this.parseLink(path, value);
      });

      return object;
    };

    return handleObject(block);
  }
}
