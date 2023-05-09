#!/usr/bin/env bash

ENV_VARIABLES_CONFIG=$(<env-config.json)

BACKEND_ENV_VARIABLES_ARRAY=($(echo "$ENV_VARIABLES_CONFIG" | jq -r '.backend[]'))
FRONTEND_ENV_VARIABLES_ARRAY=($(echo "$ENV_VARIABLES_CONFIG" | jq -r '.frontend[]'))

ALL_ENV_VARIABLES=(
  $(paste -d ' ' <(printf "%s\n" "${BACKEND_ENV_VARIABLES_ARRAY[@]}") <(printf "%s\n" "${FRONTEND_ENV_VARIABLES_ARRAY[@]}"))
)

for VARIABLE in "${ALL_ENV_VARIABLES[@]}"
  do
    echo "TARGET_$VARIABLE=production,preview,development" >> "$GITHUB_ENV"
    echo "TYPE_$VARIABLE=plain" >> "$GITHUB_ENV"
  done

BACKEND_ENV_VARIABLES=$(printf "%s," "${BACKEND_ENV_VARIABLES_ARRAY[@]}")
FRONTEND_ENV_VARIABLES=$(printf "%s," "${FRONTEND_ENV_VARIABLES_ARRAY[@]}")

echo "BACKEND_ENV_VARIABLES=${BACKEND_ENV_VARIABLES%,}" >> "$GITHUB_ENV"
echo "FRONTEND_ENV_VARIABLES=${FRONTEND_ENV_VARIABLES%,}" >> "$GITHUB_ENV"
