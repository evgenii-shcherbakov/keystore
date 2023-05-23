#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
APP_NAME="libraries"

NPM_ACCESS_TOKEN=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$API_HOST/applications/$APP_NAME/publishing/npm/access-token"
)

echo "$NPM_ACCESS_TOKEN"
