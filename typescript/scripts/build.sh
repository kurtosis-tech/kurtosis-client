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
tsc ${lang_root_dirpath}/index.ts --outDir ${lang_root_dirpath}/build/typescript/ --downlevelIteration true --declaration true
cp -R ${lang_root_dirpath}/kurtosis_core_rpc_api_bindings ${lang_root_dirpath}/build/typescript/