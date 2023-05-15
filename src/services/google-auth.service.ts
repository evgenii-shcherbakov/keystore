import { Compute, GoogleAuth } from 'google-auth-library';
import { CredentialBody } from 'google-auth-library/build/src/auth/credentials';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

export class GoogleAuthService {
  static async generateTemporaryToken(credential: CredentialBody): Promise<string> {
    const instance = new GoogleAuth({
      credentials: credential,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client: JSONClient | Compute = await instance.getClient();
    const tokenResponse: GetAccessTokenResponse = await client.getAccessToken();

    if (!tokenResponse.token) {
      throw new Error('Error during generation of temporary GCP token');
    }

    return tokenResponse.token;
  }
}
