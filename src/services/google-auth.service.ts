import { GoogleAuth, IdTokenClient } from 'google-auth-library';
import { CredentialBody } from 'google-auth-library/build/src/auth/credentials';
import { GOOGLE_PROJECT_ID } from '@/constants/environment';

export class GoogleAuthService {
  static async generateTemporaryToken(credential: CredentialBody, url: string): Promise<string> {
    const instance = new GoogleAuth({
      credentials: credential,
      projectId: GOOGLE_PROJECT_ID,
    });

    const client: IdTokenClient = await instance.getIdTokenClient(url);
    return client.idTokenProvider.fetchIdToken(url);
  }
}
