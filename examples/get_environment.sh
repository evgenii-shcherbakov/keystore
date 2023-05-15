#!/usr/bin/env bash

HOST="http://localhost:3000/api"
APP_NAME="safe"
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJSVBFS09MSUNUIiwiaWF0IjoxNjgzOTkzNzE5LCJleHAiOjMzMjcyNDM4NTE5LCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJpaXBla29saWN0QGdtYWlsLmNvbSIsIkdpdmVuTmFtZSI6IkV2Z2VuaWkiLCJTdXJuYW1lIjoiU2hjaGVyYmFrb3YiLCJFbWFpbCI6ImlpcGVrb2xpY3RAZ21haWwuY29tIiwiUm9sZSI6IkFkbWluIn0.ydkfzU_s_kMmsWJR2gHM2D8-d7pBdjv4wX1xLupZVhM"

# Response body (GET):
# { [stage]: { json: object, raw: string } }

FULL_RESPONSE=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/applications/$APP_NAME/environment"
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
    --url "$HOST/applications/$APP_NAME/environment"
)

echo "$PARTIAL_RESPONSE_RAW"

PARTIAL_RESPONSE_JSON=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"format\": \"json\",\"stage\": \"dev\"}" \
    --url "$HOST/applications/$APP_NAME/environment"
)

echo "$PARTIAL_RESPONSE_JSON"
