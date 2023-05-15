#!/usr/bin/env bash

HOST="http://localhost:3000/api"
APP_NAME="safe"
TARGET="project.json"
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJSVBFS09MSUNUIiwiaWF0IjoxNjgzOTkzNzE5LCJleHAiOjMzMjcyNDM4NTE5LCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJpaXBla29saWN0QGdtYWlsLmNvbSIsIkdpdmVuTmFtZSI6IkV2Z2VuaWkiLCJTdXJuYW1lIjoiU2hjaGVyYmFrb3YiLCJFbWFpbCI6ImlpcGVrb2xpY3RAZ21haWwuY29tIiwiUm9sZSI6IkFkbWluIn0.ydkfzU_s_kMmsWJR2gHM2D8-d7pBdjv4wX1xLupZVhM"

# TARGET variants: 'project.json' | 'vercel.json'

# Response body:
# { projectJson: object | null, vercelJson: object | null, rawProjectJson: string, rawVercelJson: string }

FULL_RESPONSE=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/applications/$APP_NAME/vercel"
)

echo "$FULL_RESPONSE"

# Request body:
# - target: 'vercel.json' | 'project.json'

# Response body:
# object

TARGET_RESPONSE=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"target\":\"$TARGET\"}" \
    --url "$HOST/applications/$APP_NAME/vercel"
)

echo "$TARGET_RESPONSE"
