# This script regenerates Go bindings corresponding to the .proto files that define the API container's API
# It requires the Golang Protobuf extension to the 'protoc' compiler, as well as the Golang gRPC extension

set -euo pipefail
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)"
root_dirpath="$(dirname "${script_dirpath}")"

golang_subdir_dirpath="${root_dirpath}/golang"
if ! GO_MOD_FILEPATH="${golang_subdir_dirpath}/go.mod" generate-protobuf-bindings.sh "${root_dirpath}/core-api" "${golang_subdir_dirpath}/core_api_bindings" "golang"; then
    echo "Error: Couldn't generate golang protobuf bindings" >&2
    exit 1
fi
