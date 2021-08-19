#!/usr/bin/env bash
# 2021-07-08 WATERMARK, DO NOT REMOVE - This script was generated from the Kurtosis Bash script template

# This script publishes the Typescript package to NPM
# It is intended to be run inside of CI

set -euo pipefail   # Bash "strict mode"
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ==================================================================================================
#                                             Constants
# ==================================================================================================

# ==================================================================================================
#                                       Arg Parsing & Validation
# ==================================================================================================
show_helptext_and_exit() {
    echo "Usage: $(basename "${0}") npm_auth_token"
    echo ""
    echo "  npm_auth_token   Auth token for publishing to NPM, obtained via 'npm login'"
    echo ""
    exit 1  # Exit with an error so that if this is accidentally called by CI, the script will fail
}

npm_auth_token="${1:-}"

if [ -z "${npm_auth_token}" ]; then
    echo "Error: No NPM auth token provided" >&2
    show_helptext_and_exit
fi

# ==================================================================================================
#                                             Main Logic
# ==================================================================================================
cd "${lang_root_dirpath}"
"${script_dirpath}/build.sh"
npm publish
