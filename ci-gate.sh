#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

run() {
  echo ""
  echo "> $*"
  "$@"
}

# Core docs checks
run npm run check

# Link checks
# Default mode is offline for fast, deterministic local runs.
# Set LINK_CHECK_MODE=online to include remote HTTP checks.
LINK_CHECK_MODE="${LINK_CHECK_MODE:-offline}"
LINK_INPUTS=("README.md" "src/**/*.tsx")
if [ -d "docs" ]; then
  LINK_INPUTS+=("docs/**/*.md")
fi

LYCHEE_PATH_EXCLUDES=(
  "node_modules/**"
  ".next/**"
  ".netlify/**"
)

if command -v lychee >/dev/null 2>&1; then
  if [ "$LINK_CHECK_MODE" = "online" ]; then
    run lychee \
      --verbose \
      --no-progress \
      --accept 200,206,429 \
      --timeout 15 \
      --max-concurrency 8 \
      --retry-wait-time 1 \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[0]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[1]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[2]}" \
      "${LINK_INPUTS[@]}"
  else
    run lychee \
      --verbose \
      --no-progress \
      --offline \
      --include-mail \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[0]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[1]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[2]}" \
      "${LINK_INPUTS[@]}"
  fi
elif command -v docker >/dev/null 2>&1; then
  if [ "$LINK_CHECK_MODE" = "online" ]; then
    run docker run --rm -v "$PWD":/work -w /work lycheeverse/lychee:latest \
      --verbose \
      --no-progress \
      --accept 200,206,429 \
      --timeout 15 \
      --max-concurrency 8 \
      --retry-wait-time 1 \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[0]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[1]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[2]}" \
      "${LINK_INPUTS[@]}"
  else
    run docker run --rm -v "$PWD":/work -w /work lycheeverse/lychee:latest \
      --verbose \
      --no-progress \
      --offline \
      --include-mail \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[0]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[1]}" \
      --exclude-path "${LYCHEE_PATH_EXCLUDES[2]}" \
      "${LINK_INPUTS[@]}"
  fi
else
  echo "Lychee is required for local CI gate. Install lychee or Docker."
  exit 1
fi

# Security gate
run npm audit --audit-level=high

echo ""
echo "Local CI gate passed"
