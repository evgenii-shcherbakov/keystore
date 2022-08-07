declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_PROJECT_ID?: string;
      GOOGLE_PRIVATE_KEY?: string;
      GOOGLE_CLIENT_EMAIL?: string;
      GOOGLE_BUCKET_NAME?: string;
      JWT_ACCESS_TOKEN?: string;
    }
  }
}

export {};
