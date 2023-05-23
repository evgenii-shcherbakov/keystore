#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
APP_NAME="libraries"

# Request body:
# - format: 'json' | 'maven-env-string'

JSON_FORMAT=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\":\"json\"}" \
    --url "$API_HOST/applications/$APP_NAME/publishing/maven-central"
)

echo "$JSON_FORMAT"

MAVEN_ENV_STRING_FORMAT=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\":\"maven-env-string\"}" \
    --url "$API_HOST/applications/$APP_NAME/publishing/maven-central"
)

echo "$MAVEN_ENV_STRING_FORMAT"
