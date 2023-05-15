#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
HOST=${HOST:-"http://localhost:3000/api"}
APP_NAME="safe"

BUILD_NUMBER=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/applications/$APP_NAME/build-number"
)

echo "$BUILD_NUMBER"

# Request body:
# - value?: number

INCREMENTED_BUILD_NUMBER=$(
  curl \
    -X PATCH \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"value\":\"1\"}" \
    --url "$HOST/applications/$APP_NAME/build-number"
)

echo "$INCREMENTED_BUILD_NUMBER"
