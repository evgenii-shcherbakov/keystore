import * as admin from 'firebase-admin';

export class FirebaseService {
  private readonly application: admin.app.App;

  constructor() {
    this.application = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.GOOGLE_PROJECT_ID,
        privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      }),
      storageBucket: process.env.GOOGLE_BUCKET_NAME,
    });
  }

  get app(): admin.app.App {
    return this.application;
  }
}
