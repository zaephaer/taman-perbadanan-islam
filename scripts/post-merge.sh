#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
git config core.hooksPath scripts/git-hooks

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Running GitHub sync..."
if bash scripts/sync-github.sh; then
  echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] GitHub sync completed successfully."
else
  echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] WARNING: GitHub sync failed. Check sync-github.sh output above for notification status. Run 'bash scripts/sync-github.sh' to retry." >&2
fi
