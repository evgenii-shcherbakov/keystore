#!/usr/bin/env bash

ENV_VARIABLES_CONFIG=$(<env-config.json)

ENV_VARIABLES_ARRAY=($(echo "$ENV_VARIABLES_CONFIG" | jq -r '.[]'))

for VARIABLE in "${ENV_VARIABLES_ARRAY[@]}"
  do
    echo "TARGET_$VARIABLE=production,preview,development" >> "$GITHUB_ENV"
    echo "TYPE_$VARIABLE=plain" >> "$GITHUB_ENV"
  done

ENV_VARIABLES=$(printf "%s," "${ENV_VARIABLES_ARRAY[@]}")

echo "ENV_VARIABLES=${ENV_VARIABLES%,}" >> "$GITHUB_ENV"
