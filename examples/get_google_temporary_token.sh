#!/usr/bin/env bash

HOST="http://localhost:3000/api"
SERVICE="pub-dev"
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJSVBFS09MSUNUIiwiaWF0IjoxNjgzOTkzNzE5LCJleHAiOjMzMjcyNDM4NTE5LCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJpaXBla29saWN0QGdtYWlsLmNvbSIsIkdpdmVuTmFtZSI6IkV2Z2VuaWkiLCJTdXJuYW1lIjoiU2hjaGVyYmFrb3YiLCJFbWFpbCI6ImlpcGVrb2xpY3RAZ21haWwuY29tIiwiUm9sZSI6IkFkbWluIn0.ydkfzU_s_kMmsWJR2gHM2D8-d7pBdjv4wX1xLupZVhM"

# SERVICE variants: 'pub-dev'

TEMPORARY_TOKEN=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/google/temporary-token/$SERVICE"
)

echo "$TEMPORARY_TOKEN"
