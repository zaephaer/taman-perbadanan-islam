#!/bin/bash
set -euo pipefail

GITHUB_REPO="zaephaer/taman-perbadanan-islam"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ -z "${GITHUB_PAT:-}" ]; then
  echo "[${TIMESTAMP}] WARNING: GITHUB_PAT is not set. Skipping GitHub sync." >&2
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

# Returns 0 if the GitHub issue was created successfully, 1 otherwise.
notify_failure() {
  local error_msg="$1"
  echo "[${TIMESTAMP}] ERROR: GitHub sync failed — ${error_msg}" >&2

  local issue_title="GitHub sync failed on branch '${CURRENT_BRANCH}' (${TIMESTAMP})"
  local issue_body
  issue_body="$(printf '## GitHub Sync Failure\n\n**Branch:** `%s`\n**Time:** %s\n\n**Error:**\n```\n%s\n```\n\n**What to do:**\n1. Check that `GITHUB_PAT` is valid and has `repo` scope.\n2. Re-run the sync manually: `bash scripts/sync-github.sh`\n3. Close this issue once the sync is confirmed working.' \
    "${CURRENT_BRANCH}" "${TIMESTAMP}" "${error_msg}")"

  local payload
  payload=$(jq -n \
    --arg title "${issue_title}" \
    --arg body  "${issue_body}" \
    '{"title":$title,"body":$body,"labels":["sync-failure"]}')

  local http_status
  http_status=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST \
    -H "Authorization: token ${GITHUB_PAT}" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    --data "${payload}" \
    "https://api.github.com/repos/${GITHUB_REPO}/issues")

  if [ "${http_status}" = "201" ]; then
    echo "[${TIMESTAMP}] Failure notification sent — a GitHub issue has been opened on ${GITHUB_REPO}." >&2
    return 0
  else
    echo "[${TIMESTAMP}] WARNING: Could not open a GitHub issue (HTTP ${http_status}). Please check the sync manually." >&2
    return 1
  fi
}

echo "[${TIMESTAMP}] Syncing branch '${CURRENT_BRANCH}' to GitHub (${GITHUB_REPO})..."

PUSH_OUTPUT=$(GIT_ASKPASS="$ASKPASS_SCRIPT" \
  GIT_TERMINAL_PROMPT=0 \
  git -c credential.username=oauth2 \
  push "$REMOTE_URL" "${CURRENT_BRANCH}:${CURRENT_BRANCH}" 2>&1) || {
  notify_failure "${PUSH_OUTPUT}"
  exit 1
}

echo "[${TIMESTAMP}] SUCCESS: Synced branch '${CURRENT_BRANCH}' to GitHub: https://github.com/${GITHUB_REPO}"
