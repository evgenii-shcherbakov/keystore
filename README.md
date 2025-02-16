_keystore_

# Next.js app

Next.js app for globally manage my github actions secrets

### Tech stack

- Next.js
- GCP / Firebase
- JWT

### Repository secrets

- `GOOGLE_PROJECT_ID` project id from GCP admin service account
- `GOOGLE_PRIVATE_KEY` private key from GCP admin service account
- `GOOGLE_CLIENT_EMAIL` client email from GCP admin service account
- `GOOGLE_BUCKET_NAME` firestore bucket name
- `JWT_ACCESS_TOKEN` any generated JWT bearer access token
- `VERCEL_ORGANIZATION_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`

### Environment variables

- `GOOGLE_PROJECT_ID` project id from GCP admin service account
- `GOOGLE_PRIVATE_KEY` private key from GCP admin service account
- `GOOGLE_CLIENT_EMAIL` client email from GCP admin service account
- `GOOGLE_BUCKET_NAME` firestore bucket name
- `JWT_ACCESS_TOKEN` any generated JWT bearer access token

### Load project

```shell
git clone git@github.com:evgenii-shcherbakov/keystore.git
cd keystore
```

### Start locally (needed Node.js 18+)

```shell
yarn install
yarn dev
```
