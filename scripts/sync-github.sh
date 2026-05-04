#!/bin/bash
set -euo pipefail

GITHUB_REPO="zaephaer/taman-perbadanan-islam"

if [ -z "${GITHUB_PAT:-}" ]; then
  echo "WARNING: GITHUB_PAT is not set. Skipping GitHub sync." >&2
  exit 0
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE_URL="https://github.com/${GITHUB_REPO}.git"

ASKPASS_SCRIPT=$(mktemp /tmp/git-askpass-XXXXXX.sh)
chmod 700 "$ASKPASS_SCRIPT"
printf '#!/bin/sh\necho "$GITHUB_PAT"\n' > "$ASKPASS_SCRIPT"

cleanup() {
  rm -f "$ASKPASS_SCRIPT"
}
trap cleanup EXIT

echo "Syncing branch '${CURRENT_BRANCH}' to GitHub (${GITHUB_REPO})..."

GIT_ASKPASS="$ASKPASS_SCRIPT" \
  GIT_TERMINAL_PROMPT=0 \
  git -c credential.username=oauth2 \
  push "$REMOTE_URL" "${CURRENT_BRANCH}:${CURRENT_BRANCH}"

echo "Successfully synced to GitHub: https://github.com/${GITHUB_REPO}"
