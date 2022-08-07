import {
  Bucket,
  CopyOptions,
  CopyResponse,
  GetSignedUrlResponse,
  MoveOptions,
  MoveResponse,
  SaveOptions,
  DeleteFileOptions,
} from '@google-cloud/storage';

export class StorageService {
  private static readonly DEFAULT_EXPIRATION = 30;

  constructor(private readonly bucket: Bucket) {}

  async getLink(path: string, expiration = StorageService.DEFAULT_EXPIRATION): Promise<string> {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expiration);

    const response: GetSignedUrlResponse = await this.bucket
      .file(path)
      .getSignedUrl({ action: 'read', expires: date });

    return response[0];
  }

  private async get(path: string): Promise<Response> {
    return fetch(await this.getLink(path));
  }

  private async getOrNull(path: string): Promise<Response | null> {
    if (await this.isExists(path)) return this.get(path);
    return null;
  }

  async isExists(path: string): Promise<boolean> {
    try {
      return (await this.bucket.file(path).exists())[0];
    } catch (error) {
      return false;
    }
  }

  async getAsString(path: string): Promise<string> {
    return (await this.get(path)).text();
  }

  async getAsNullableString(path: string): Promise<string | null> {
    const response: Response | null = await this.getOrNull(path);
    return response ? response.text() : null;
  }

  async getAsJSON<Type extends object>(path: string): Promise<Type> {
    return JSON.parse(await this.getAsString(path));
  }

  async getAsNullableJSON<Type extends object>(path: string): Promise<Type | null> {
    const nullableString: string | null = await this.getAsNullableString(path);
    return nullableString ? JSON.parse(nullableString) : null;
  }

  async getAsBlob(path: string): Promise<Blob> {
    return (await this.get(path)).blob();
  }

  async getAsNullableBlob(path: string): Promise<Blob | null> {
    const response: Response | null = await this.getOrNull(path);
    return response ? response.blob() : null;
  }

  async getAsBytes(path: string): Promise<ArrayBuffer> {
    return (await this.get(path)).arrayBuffer();
  }

  async getAsNullableBytes(path: string): Promise<ArrayBuffer | null> {
    const response: Response | null = await this.getOrNull(path);
    return response ? response.arrayBuffer() : null;
  }

  async save(path: string, data: string | Buffer, options?: SaveOptions) {
    return this.bucket.file(path).save(data, options);
  }

  async delete(path: string, options?: DeleteFileOptions) {
    await this.bucket.file(path).delete({ ...options, ignoreNotFound: true });
  }

  async move(path: string, destination: string, options?: MoveOptions): Promise<MoveResponse> {
    return this.bucket.file(path).move(destination, options);
  }

  async copy(path: string, destination: string, options?: CopyOptions): Promise<CopyResponse> {
    return this.bucket.file(path).copy(destination, options);
  }
}
