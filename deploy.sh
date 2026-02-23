#!/bin/bash

# Netlify Deployment Script for Skillgate-docs Web UI
# Usage: ./deploy.sh [preview|prod]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "=========================================="
echo "  Skillgate-docs Deployment"
echo "=========================================="
echo ""

if [ "$#" -gt 1 ]; then
    echo "Usage: ./deploy.sh [preview|prod]"
    exit 1
fi

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if logged in
if ! netlify api getCurrentUser &> /dev/null; then
    echo "Not logged in to Netlify. Please login:"
    netlify login
fi

# Ensure this local folder is linked to a Netlify site
if [ ! -f ".netlify/state.json" ]; then
    echo "This folder is not linked to a Netlify site yet."
    echo "Starting Netlify project setup now (create new project or link existing):"
    netlify init

    if [ ! -f ".netlify/state.json" ]; then
        echo "Netlify site setup was not completed."
        echo "Please run 'netlify init' manually and then rerun ./deploy.sh"
        exit 1
    fi
fi

# Determine deployment type
DEPLOY_TYPE="${1:-prod}"
if [ "$DEPLOY_TYPE" != "preview" ] && [ "$DEPLOY_TYPE" != "prod" ]; then
    echo "Invalid deploy type: $DEPLOY_TYPE"
    echo "Usage: ./deploy.sh [preview|prod]"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing npm dependencies...${NC}"
    npm install
fi

echo -e "${YELLOW}Running local CI gate...${NC}"
npm run ci:gate

# Build deploy trace metadata for Netlify deploy message
if command -v git &> /dev/null && git rev-parse --is-inside-work-tree &> /dev/null; then
    GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown-branch)"
    GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown-sha)"
else
    GIT_BRANCH="no-git"
    GIT_SHA="no-sha"
fi
DEPLOY_MESSAGE="skillgate-docs deploy branch=${GIT_BRANCH} sha=${GIT_SHA} target=${DEPLOY_TYPE}"
echo -e "${YELLOW}Deploy trace:${NC} ${DEPLOY_MESSAGE}"

if [ "$DEPLOY_TYPE" = "preview" ]; then
    echo -e "${YELLOW}Deploying PREVIEW build (local script, Netlify build)...${NC}"
    echo ""
    netlify deploy --build --message "$DEPLOY_MESSAGE"
    echo ""
    echo -e "${GREEN}Preview deployed! Check the URL above.${NC}"
else
    echo -e "${YELLOW}Deploying to PRODUCTION (local script, Netlify build)...${NC}"
    echo ""
    netlify deploy --build --prod --message "$DEPLOY_MESSAGE"
    echo ""
    echo -e "${GREEN}Production deploy complete. Verify your Netlify site/custom domain.${NC}"
fi

echo ""
echo "=========================================="
echo "  Deployment Complete"
echo "=========================================="
