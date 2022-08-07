#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
API_HOST=${API_HOST:-"http://localhost:3000/api"}
APP_NAME="safe"

# Response body:
# {
#   [type]: {
#     secrets: {
#       PASSWORD: string
#       ALIAS_PASSWORD: string
#       ALIAS: string
#     },
#     link: string
#   }
# }

FULL_RESPONSE=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$API_HOST/applications/$APP_NAME/sign-keystore"
)

echo "$FULL_RESPONSE"

# Request body:
# - type?: 'default' | 'debug' | 'release'

# Response body:
# {
#   secrets: {
#     PASSWORD: string
#     ALIAS_PASSWORD: string
#     ALIAS: string
#   }
#   link: string
# }

TYPED_RESPONSE=$(
  curl \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"type\":\"default\"}" \
    --url "$API_HOST/applications/$APP_NAME/sign-keystore"
)

echo "$TYPED_RESPONSE"
