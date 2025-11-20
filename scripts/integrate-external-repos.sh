#!/bin/bash
set -euo pipefail

# Cathedral External Repository Integration Script
# Safely integrates external repositories as git subtrees
# Maintains separate git histories while enabling bidirectional sync

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPOS_CONFIG="$REPO_ROOT/repos-to-import.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    log_error "jq is required but not installed. Please install jq first."
    exit 1
fi

# Parse repos-to-import.json
if [ ! -f "$REPOS_CONFIG" ]; then
    log_error "Configuration file not found: $REPOS_CONFIG"
    exit 1
fi

log_info "Reading repository configuration from $REPOS_CONFIG"

# Read number of repositories
REPO_COUNT=$(jq 'length' "$REPOS_CONFIG")
log_info "Found $REPO_COUNT repositories to integrate"

# Function to integrate a single repository
integrate_repo() {
    local remote_url="$1"
    local branch="$2"
    local prefix="$3"
    
    # Extract repo name from URL
    local repo_name=$(basename "$remote_url" .git)
    local remote_name="external-$repo_name"
    
    log_info "Integrating: $repo_name"
    log_info "  Remote: $remote_url"
    log_info "  Branch: $branch"
    log_info "  Prefix: $prefix"
    
    # Check if directory already exists
    if [ -d "$REPO_ROOT/$prefix" ]; then
        log_warning "  Directory already exists: $prefix"
        log_info "  Skipping integration (use update command to sync)"
        return 0
    fi
    
    # Add remote if it doesn't exist
    if git remote | grep -q "^$remote_name$"; then
        log_info "  Remote '$remote_name' already exists"
    else
        log_info "  Adding remote: $remote_name"
        git remote add "$remote_name" "$remote_url"
    fi
    
    # Fetch the remote
    log_info "  Fetching from $remote_name..."
    git fetch "$remote_name" "$branch" --depth=1
    
    # Add as subtree
    log_info "  Adding subtree to $prefix..."
    git subtree add --prefix="$prefix" "$remote_name" "$branch" --squash
    
    log_success "  Successfully integrated $repo_name"
}

# Function to update an existing subtree
update_repo() {
    local remote_url="$1"
    local branch="$2"
    local prefix="$3"
    
    local repo_name=$(basename "$remote_url" .git)
    local remote_name="external-$repo_name"
    
    log_info "Updating: $repo_name"
    
    # Check if directory exists
    if [ ! -d "$REPO_ROOT/$prefix" ]; then
        log_error "  Directory does not exist: $prefix"
        log_info "  Use 'integrate' command first"
        return 1
    fi
    
    # Fetch the remote
    log_info "  Fetching updates from $remote_name..."
    git fetch "$remote_name" "$branch"
    
    # Pull updates
    log_info "  Pulling updates into $prefix..."
    git subtree pull --prefix="$prefix" "$remote_name" "$branch" --squash
    
    log_success "  Successfully updated $repo_name"
}

# Function to push changes back to external repo
push_repo() {
    local remote_url="$1"
    local branch="$2"
    local prefix="$3"
    
    local repo_name=$(basename "$remote_url" .git)
    local remote_name="external-$repo_name"
    
    log_info "Pushing changes from: $repo_name"
    
    # Check if directory exists
    if [ ! -d "$REPO_ROOT/$prefix" ]; then
        log_error "  Directory does not exist: $prefix"
        return 1
    fi
    
    # Push changes
    log_info "  Pushing changes from $prefix to $remote_name..."
    git subtree push --prefix="$prefix" "$remote_name" "$branch"
    
    log_success "  Successfully pushed changes to $repo_name"
}

# Main command handler
case "${1:-help}" in
    integrate)
        log_info "Starting repository integration..."
        cd "$REPO_ROOT"
        
        for i in $(seq 0 $((REPO_COUNT - 1))); do
            remote=$(jq -r ".[$i].remote" "$REPOS_CONFIG")
            branch=$(jq -r ".[$i].branch" "$REPOS_CONFIG")
            prefix=$(jq -r ".[$i].prefix" "$REPOS_CONFIG")
            
            integrate_repo "$remote" "$branch" "$prefix"
            echo ""
        done
        
        log_success "Integration complete!"
        ;;
        
    update)
        log_info "Updating integrated repositories..."
        cd "$REPO_ROOT"
        
        for i in $(seq 0 $((REPO_COUNT - 1))); do
            remote=$(jq -r ".[$i].remote" "$REPOS_CONFIG")
            branch=$(jq -r ".[$i].branch" "$REPOS_CONFIG")
            prefix=$(jq -r ".[$i].prefix" "$REPOS_CONFIG")
            
            update_repo "$remote" "$branch" "$prefix"
            echo ""
        done
        
        log_success "Update complete!"
        ;;
        
    push)
        if [ -z "${2:-}" ]; then
            log_error "Please specify a repository name to push"
            exit 1
        fi
        
        repo_name="$2"
        log_info "Pushing changes for: $repo_name"
        cd "$REPO_ROOT"
        
        # Find the repository in config
        found=false
        for i in $(seq 0 $((REPO_COUNT - 1))); do
            remote=$(jq -r ".[$i].remote" "$REPOS_CONFIG")
            branch=$(jq -r ".[$i].branch" "$REPOS_CONFIG")
            prefix=$(jq -r ".[$i].prefix" "$REPOS_CONFIG")
            current_name=$(basename "$remote" .git)
            
            if [ "$current_name" = "$repo_name" ]; then
                push_repo "$remote" "$branch" "$prefix"
                found=true
                break
            fi
        done
        
        if [ "$found" = false ]; then
            log_error "Repository not found: $repo_name"
            exit 1
        fi
        ;;
        
    list)
        log_info "Configured external repositories:"
        echo ""
        for i in $(seq 0 $((REPO_COUNT - 1))); do
            remote=$(jq -r ".[$i].remote" "$REPOS_CONFIG")
            branch=$(jq -r ".[$i].branch" "$REPOS_CONFIG")
            prefix=$(jq -r ".[$i].prefix" "$REPOS_CONFIG")
            repo_name=$(basename "$remote" .git)
            
            echo "  $((i + 1)). $repo_name"
            echo "     Remote: $remote"
            echo "     Branch: $branch"
            echo "     Prefix: $prefix"
            
            if [ -d "$REPO_ROOT/$prefix" ]; then
                echo -e "     Status: ${GREEN}✓ Integrated${NC}"
            else
                echo -e "     Status: ${YELLOW}○ Not integrated${NC}"
            fi
            echo ""
        done
        ;;
        
    help|*)
        cat << EOF
Cathedral External Repository Integration Script

Usage: $0 <command> [options]

Commands:
  integrate    Integrate all external repositories as git subtrees
  update       Pull latest changes from all integrated repositories
  push <name>  Push changes back to a specific external repository
  list         List all configured external repositories
  help         Show this help message

Examples:
  $0 integrate                    # Integrate all repos
  $0 update                       # Update all integrated repos
  $0 push circuitum99            # Push changes to circuitum99 repo
  $0 list                        # List all configured repos

Note: This script uses git subtree to maintain separate histories
while keeping everything in one repository.

EOF
        ;;
esac