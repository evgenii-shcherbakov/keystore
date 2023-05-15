#!/usr/bin/env bash

TOKEN=${TOKEN:-$1}
HOST=${HOST:-"http://localhost:3000/api"}
SERVICE="pub-dev"

# SERVICE variants: 'pub-dev'

TEMPORARY_TOKEN=$(
  curl \
    -X GET \
    -H "Authorization: Bearer $TOKEN" \
    --url "$HOST/google/temporary-token/$SERVICE"
)

echo "$TEMPORARY_TOKEN"
