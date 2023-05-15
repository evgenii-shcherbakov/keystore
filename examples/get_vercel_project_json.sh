#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
HOST=${HOST:-"http://localhost:3000/api"}
APP_NAME="safe"
TARGET="project.json"

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
