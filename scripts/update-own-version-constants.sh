#!/usr/bin/env bash
# 2021-07-08 WATERMARK, DO NOT REMOVE - This script was generated from the Kurtosis Bash script template

# In order for testsuites and Lambdas to report the version of Kurtosis API that they depend on, we provide a constant
#  that contains the version of this library. This script is responsible for updating that constant in all the various
#  language, and will be run as part of the release flow of this repo.

set -euo pipefail   # Bash "strict mode"
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dirpath="$(dirname "${script_dirpath}")"



# ==================================================================================================
#                                             Constants
# ==================================================================================================
SUPPORTED_LANGS_FILENAME="supported-languages.txt"
SED_REPLACE_SUFFIX_FOR_DELETION=".DELETEME"

# Go
GO_CONST_FILE_RELATIVE_FILEPATH="golang/lib/kurtosis_api_version_const/kurtosis_api_version_const.go"
GO_CONST_NAME="KurtosisApiVersion"




# ==================================================================================================
#                                       Arg Parsing & Validation
# ==================================================================================================
# TODO Modify the arguments below to match the argument to your script
show_helptext_and_exit() {
    echo "Usage: $(basename "${0}") new_version"
    echo ""
    echo "  new_version     The version of this repo that is about to be released"
    echo ""
    exit 1  # Exit with an error so that if this is accidentally called by CI, the script will fail
}

new_version="${1:-}"

if [ -z "${new_version}" ]; then
    echo "Error: No new version provided" >&2
    show_helptext_and_exit
fi



# ==================================================================================================
#                                             Main Logic
# ==================================================================================================
function get_update_constant_function_name() {
    lang="${1}"
    echo "idempotent_update_${lang}_constant"
}

# Gets the Go constant pattern, with the value passed in as an arg
# E.g. if '.*' were passed in to this script, it would form a replace pattern
# E.g. if '1.2.3' were passed in, it would form an actual string to replace with
function get_go_constant_pattern() {
    constant_value="${1}"
    echo "${GO_CONST_NAME} = \"${constant_value}\""
}

# vvvvvvvvvvvv There MUST be one idempotent update function per supported language vvvvvvvvvvvvvvvvv
# Note that, when doing a 'sed' in these functions, you can use the SED_REPLACE_SUFFIX_FOR_DELETION
#  as the argument to -i, and the file will get deleted at the end of this script

function idempotent_update_golang_constant() {
    new_version="${1}"

    to_update_filepath="${root_dirpath}/${GO_CONST_FILE_RELATIVE_FILEPATH}"
    if ! [ -f "${to_update_filepath}" ]; then
        echo "Error: Needed to update file '${to_update_filepath}' containing Go version constant, but such file doesn't exist" >&2
        return 1
    fi
    if ! search_pattern="$(get_go_constant_pattern ".*")"; then
        echo "Error: Couldn't form Go constant search pattern" >&2
        return 1
    fi
    num_matching_lines="$(grep "${search_pattern}" "${to_update_filepath}" | wc -l)"
    if ! [ "${num_matching_lines}" -eq 1 ]; then
        echo "Error: Expected exactly one line in '${to_update_filepath}' matching pattern '${search_pattern}' but got ${num_matching_lines}" >&2
        return 1
    fi

    if ! replace_value="$(get_go_constant_pattern "${new_version}")"; then
        echo "Error: Couldn't form Go constant replacement value" >&2
        return 1
    fi
    if ! sed -i "${SED_REPLACE_SUFFIX_FOR_DELETION}" "s|${search_pattern}|${replace_value}|" "${to_update_filepath}"; then
        echo "Error: An error occurred replacing Go constant pattern '${search_pattern}' with value '${replace_value}'" >&2
        return 1
    fi
}

function idempotent_update_typescript_constant() {
    new_version="${1}"
}
# ^^^^^^^^^^^^ There MUST be one idempotent update function per supported language ^^^^^^^^^^^^^^^^^

supported_langs_filepath="${root_dirpath}/${SUPPORTED_LANGS_FILENAME}"

# Before we do any updating, sanity-check that we have update functions for all supported langs
for lang in $(cat "${supported_langs_filepath}"); do
    expected_function_name="$(get_update_constant_function_name "${lang}")"
    if [ "$(type -t "${expected_function_name}")" != "function" ]; then
        echo "Error: We support language '${lang}' but no '${expected_function_name}' function was found in this script; this must be provided!" >&2
        exit 1
    fi
done

echo "Updating the constants containing this library's version for all supported languages..."
for lang in $(cat "${supported_langs_filepath}"); do
    update_function="$(get_update_constant_function_name "${lang}")"
    if ! "${update_function}" "${new_version}"; then
        echo "Error: The function '${update_function}' for updating the ${lang} constant containing this library's version exited with an error" >&2
        exit 1
    fi
done
if ! find "${root_dirpath}" -name "*${SED_REPLACE_SUFFIX_FOR_DELETION}" -delete; then
    echo "Error: The constant-replacing succeeded, but an error occurred removing the sed backup files ending with suffix '${SED_REPLACE_SUFFIX_FOR_DELETION}; these will need to be removed manually" >&2
    exit 1
fi
echo "Successfully updated the constants containing this library's version have been updated for all supported languages"
