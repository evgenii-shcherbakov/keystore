import * as admin from 'firebase-admin';
import {
  GOOGLE_BUCKET_NAME,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_PROJECT_ID,
} from '@/constants/environment';

export class FirebaseService {
  private readonly application: admin.app.App;

  constructor() {
    this.application = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: GOOGLE_PROJECT_ID,
        privateKey: GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        clientEmail: GOOGLE_CLIENT_EMAIL,
      }),
      storageBucket: GOOGLE_BUCKET_NAME,
    });
  }

  get app(): admin.app.App {
    return this.application;
  }
}
