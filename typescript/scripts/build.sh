#!/usr/bin/env bash
# The above is the most platform-agnostic way to guarantee this script runs with Bash

set -euo pipefail   # Bash "strict mode"

# # ==================================================================================================
# #                                             Constants
# # ==================================================================================================
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
lang_root_dirpath="$(dirname "${script_dirpath}")"


# # ==================================================================================================
# #                                             Main Logic
# # ==================================================================================================
find_results="$(find ${lang_root_dirpath}/lib -name "*.ts")"
tsc ${find_results} --outFile ${lang_root_dirpath}/build/output.js --module system --moduleResolution node
