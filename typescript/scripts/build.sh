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
#find_results="$(find ${lang_root_dirpath} -name "*.ts" -not -path "${lang_root_dirpath}/kurtosis_core_rpc_api_bindings/*" -not -path "${lang_root_dirpath}/node_modules/*")"

tsc ${lang_root_dirpath}/index.ts --outDir ${lang_root_dirpath}/build/ --downlevelIteration true --declaration true
cp -R ${lang_root_dirpath}/kurtosis_core_rpc_api_bindings/ ${lang_root_dirpath}/build/kurtosis_core_rpc_api_bindings/ #TODO - error checking but after confirming if this is okay solution

#tsc ${lang_root_dirpath}/index.ts --outDir ${lang_root_dirpath}/build --downlevelIteration

#These two commands below made everything work
#tsc index.ts --outDir ${lang_root_dirpath}build/ --downlevelIteration --declaration true --allowJs true
#cp -R kurtosis_core_rpc_api_bindings/ build/kurtosis_core_rpc_api_bindings/