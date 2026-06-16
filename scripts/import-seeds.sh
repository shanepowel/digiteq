#!/usr/bin/env bash
# Import Digiteq seed content into Sanity.
# Usage: ./scripts/import-seeds.sh [dataset]
# Requires NEXT_PUBLIC_SANITY_PROJECT_ID and a token with write access (sanity login or SANITY_AUTH_TOKEN).
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

DATASET="${1:-${NEXT_PUBLIC_SANITY_DATASET:-production}}"
REPLACE=(--replace)

if [[ -z "${NEXT_PUBLIC_SANITY_PROJECT_ID:-}" ]]; then
  echo "Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set."
  echo "Add it to .env.local or export it before running this script."
  exit 1
fi

export NEXT_PUBLIC_SANITY_DATASET="$DATASET"

echo "→ generate seed files"
node scripts/generate-sanity-seeds.js

echo "→ importing team members"
npx sanity dataset import sanity/seed/team-members.ndjson "$DATASET" "${REPLACE[@]}"

echo "→ importing companies"
npx sanity dataset import sanity/seed/companies.ndjson "$DATASET" "${REPLACE[@]}"

echo "→ importing ventures"
npx sanity dataset import sanity/seed/ventures.ndjson "$DATASET" "${REPLACE[@]}"

echo "→ importing insights"
npx sanity dataset import sanity/seed/insights.ndjson "$DATASET" "${REPLACE[@]}"

echo "Done. Open /studio to review, then publish documents if using draft mode."
