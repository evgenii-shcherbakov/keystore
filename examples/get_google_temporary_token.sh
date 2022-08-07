#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
ACCOUNT="pub-dev"

# Request body:
# - account: 'pub-dev' | 'libraries-admin'
# - url: string

TEMPORARY_TOKEN=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"url\":\"https://pub.dev\",\"account\":\"$ACCOUNT\"}" \
    --url "$API_HOST/google/temporary-token"
)

echo "$TEMPORARY_TOKEN"
