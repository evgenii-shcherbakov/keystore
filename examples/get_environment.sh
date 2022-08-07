#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
APP_NAME="safe"

# Response body (GET):
# { [stage]: { json: object, raw: string } }

FULL_RESPONSE=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$API_HOST/applications/$APP_NAME/environment"
)

echo "$FULL_RESPONSE"

# Request body (POST):
# - format?: 'raw' | 'json'
# - stage?: '' | 'local' | 'dev' | 'stage' | 'prod'

PARTIAL_RESPONSE_RAW=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\": \"raw\",\"stage\": \"dev\"}" \
    --url "$API_HOST/applications/$APP_NAME/environment"
)

echo "$PARTIAL_RESPONSE_RAW"

PARTIAL_RESPONSE_JSON=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\": \"json\",\"stage\": \"dev\"}" \
    --url "$API_HOST/applications/$APP_NAME/environment"
)

echo "$PARTIAL_RESPONSE_JSON"
