#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
APP_NAME="libraries"

# Request body:
# - format: 'json' | 'gradle-properties'

JSON_FORMAT=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\":\"json\"}" \
    --url "$API_HOST/applications/$APP_NAME/publishing/maven-central"
)

echo "$JSON_FORMAT"

GRADLE_PROPERTIES_FORMAT=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\":\"gradle-properties\"}" \
    --url "$API_HOST/applications/$APP_NAME/publishing/maven-central"
)

echo "$GRADLE_PROPERTIES_FORMAT"
