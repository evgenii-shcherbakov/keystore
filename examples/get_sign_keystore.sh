#!/usr/bin/env bash

HOST="http://localhost:3000/api"
APP_NAME="safe"
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJSVBFS09MSUNUIiwiaWF0IjoxNjgzOTkzNzE5LCJleHAiOjMzMjcyNDM4NTE5LCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJpaXBla29saWN0QGdtYWlsLmNvbSIsIkdpdmVuTmFtZSI6IkV2Z2VuaWkiLCJTdXJuYW1lIjoiU2hjaGVyYmFrb3YiLCJFbWFpbCI6ImlpcGVrb2xpY3RAZ21haWwuY29tIiwiUm9sZSI6IkFkbWluIn0.ydkfzU_s_kMmsWJR2gHM2D8-d7pBdjv4wX1xLupZVhM"

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
    --url "$HOST/applications/$APP_NAME/sign-keystore"
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
    --url "$HOST/applications/$APP_NAME/sign-keystore"
)

echo "$TYPED_RESPONSE"
