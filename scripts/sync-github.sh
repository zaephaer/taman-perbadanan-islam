#!/bin/bash
set -euo pipefail

GITHUB_REPO="zaephaer/taman-perbadanan-islam"

if [ -z "${GITHUB_PAT:-}" ]; then
  echo "WARNING: GITHUB_PAT is not set. Skipping GitHub sync." >&2
  exit 0
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE_URL="https://oauth2:${GITHUB_PAT}@github.com/${GITHUB_REPO}.git"
SAFE_REMOTE="https://github.com/${GITHUB_REPO}.git"

echo "Syncing branch '${CURRENT_BRANCH}' to GitHub (${GITHUB_REPO})..."

git push "$REMOTE_URL" "${CURRENT_BRANCH}:${CURRENT_BRANCH}" 2>&1 \
  | sed "s|${REMOTE_URL}|${SAFE_REMOTE}|g"

echo "Successfully synced to GitHub: https://github.com/${GITHUB_REPO}"
