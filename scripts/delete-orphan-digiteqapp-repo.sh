#!/usr/bin/env bash
# Delete the orphan portal repo created by Vercel's "New Project" flow.
# Run with your GitHub account (not the Cursor bot token):
#   gh auth login
#   ./scripts/delete-orphan-digiteqapp-repo.sh

set -euo pipefail

REPO="shanepowel/digiteqapp"

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in first: gh auth login"
  exit 1
fi

if ! gh repo view "$REPO" >/dev/null 2>&1; then
  echo "$REPO not found — already deleted or not visible to this GitHub account."
  exit 0
fi

echo "Deleting $REPO..."
gh repo delete "$REPO" --yes
echo "Deleted $REPO."
