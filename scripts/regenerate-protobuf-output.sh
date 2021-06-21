#!/usr/bin/env bash

# This script regenerates Go bindings corresponding to all .proto files inside this project
# It requires the Golang Protobuf extension to the 'protoc' compiler, as well as the Golang gRPC extension

set -euo pipefail
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)"
root_dirpath="$(dirname "${script_dirpath}")"

# ================================ CONSTANTS =======================================================
GENERATOR_SCRIPT_FILENAME="generate-protobuf-bindings.sh"  # Must be on the PATH
CORE_API_DIRNAME="core-api"
GOLANG_DIRNAME="golang"

# =============================== MAIN LOGIC =======================================================
input_dirpath="${root_dirpath}/${CORE_API_DIRNAME}"

go_output_dirpath="${root_dirpath}/${GOLANG_DIRNAME}/core_api_bindings"
if ! GO_MOD_FILEPATH="${root_dirpath}/${GOLANG_DIRNAME}/go.mod" "${GENERATOR_SCRIPT_FILENAME}" "${input_dirpath}" "${go_output_dirpath}" golang; then
    echo "Error: An error occurred generating Go bindings in directory '${go_output_dirpath}'" >&2
    exit 1
fi
echo "Successfully generated Go bindings in directory '${go_output_dirpath}'"
