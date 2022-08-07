import { FirebaseService } from '@/services/firebase.service';
import { StorageService } from '@/services/storage.service';
import { JwtService } from '@/services/jwt.service';
import { GoogleAuthService } from '@/services/google-auth.service';
import { ApplicationService } from '@/services/application.service';
import { JWT_ACCESS_TOKEN } from '@/constants/environment';

const firebaseApp = new FirebaseService().app;

export const storageService = new StorageService(firebaseApp.storage().bucket());
export const jwtService = new JwtService(JWT_ACCESS_TOKEN);

export { GoogleAuthService, ApplicationService };
