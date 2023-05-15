#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
HOST=${HOST:-"http://localhost:3000/api"}
APP_NAME="libraries"

NPM_ACCESS_TOKEN=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/applications/$APP_NAME/npm/access-token"
)

echo "$NPM_ACCESS_TOKEN"
