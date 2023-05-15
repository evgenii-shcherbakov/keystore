#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
HOST=${HOST:-"http://localhost:3000/api"}
APP_NAME="safe"
PLATFORM="ios"

# Request body:
# - platform: 'android' | 'web' | 'ios' | 'macos' | 'windows' | 'linux'
# - parser?: 'dart'

RESPONSE=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"platform\":\"$PLATFORM\",\"parser\":\"dart\"}" \
    --url "$HOST/applications/$APP_NAME/build-arguments"
)

echo "$RESPONSE"
