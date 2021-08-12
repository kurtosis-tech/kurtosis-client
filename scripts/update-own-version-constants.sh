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

# Per-language filepath that needs updating to update the constant, relative to the repo root
declare -a CONSTANT_FILE_RELATIVE_FILEPATHS

# Name of the Bash function which will form the search/replace pattern used for updating the constant
declare -a CONSTANT_PATTERN_GETTER_FUNCTION_NAMES

# Go
CONSTANT_FILE_RELATIVE_FILEPATHS[golang]="golang/lib/kurtosis_api_version_const/kurtosis_api_version_const.go"
function get_go_constant_pattern() {
    value="${1}"
    echo "KurtosisApiVersion = \"${value}\""
}
CONSTANT_PATTERN_GETTER_FUNCTION_NAMES[golang]="get_go_constant_pattern"

# Typescript
CONSTANT_FILE_RELATIVE_FILEPATHS[typescript]="typescript/lib/kurtosis_api_version_const.ts"
function get_typescript_constant_pattern() {
    value="${1}"
    echo "KURTOSIS_API_VERSION: string = \"${value}\""
}
CONSTANT_PATTERN_GETTER_FUNCTION_NAMES[typescript]="get_typescript_constant_pattern"


# ==================================================================================================
#                                       Arg Parsing & Validation
# ==================================================================================================
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
# Function that will update the constant file for a given language
function idempotent_update_constant_file_for_lang() {
    lang="${1}"
    constant_pattern_retrieving_func_name="${2}"    # Name of a function which takes in a constant pattern and returns the pattern to search for 
    constant_relative_filepath="${3}"   # Relative to the repo root
    new_version="${4}"

    to_update_filepath="${root_dirpath}/${constant_relative_filepath}"
    if ! [ -f "${to_update_filepath}" ]; then
        echo "Error: Needed to update file '${to_update_filepath}' containing ${lang} version constant, but such file doesn't exist" >&2
        return 1
    fi
    if ! search_pattern="$("${constant_pattern_retrieving_func_name}" ".*")"; then
        echo "Error: Couldn't form ${lang} constant search pattern using function '${constant_pattern_retrieving_func_name}'" >&2
        return 1
    fi
    num_matching_lines="$(grep "${search_pattern}" "${to_update_filepath}" | wc -l)"
    if ! [ "${num_matching_lines}" -eq 1 ]; then
        echo "Error: Expected exactly one line in ${lang} constant file '${to_update_filepath}' matching pattern '${search_pattern}' but got ${num_matching_lines}" >&2
        return 1
    fi

    if ! replace_value="$("${constant_pattern_retrieving_func_name}" "${new_version}")"; then
        echo "Error: Couldn't form ${lang} constant replacement value" >&2
        return 1
    fi
    if ! sed -i "${SED_REPLACE_SUFFIX_FOR_DELETION}" "s|${search_pattern}|${replace_value}|" "${to_update_filepath}"; then
        echo "Error: An error occurred replacing ${lang} constant pattern '${search_pattern}' with value '${replace_value}'" >&2
        return 1
    fi
}


# Before we do any updating, sanity-check that we have constant file relative filepaths & search pattern functions for all supported langs
supported_langs_filepath="${root_dirpath}/${SUPPORTED_LANGS_FILENAME}"
for lang in $(cat "${supported_langs_filepath}"); do
    constant_file_rel_filepath=CONSTANT_FILE_RELATIVE_FILEPATHS["${lang}"]
    if [ -z "${constant_file_rel_filepath}" ]; then
        echo "Error: No relative filepath to a constant file that needs replacing was found for language '${lang}'; this script needs to be updated with this information" >&2
        exit 1
    fi
    if [ -z "${pattern_getter_function_name}" ]; then
        echo "Error: No function name for getting the search/replace pattern was found for language '${lang}'; this script needs to be updated with this information" >&2
        exit 1
    fi
done

echo "Updating the constants containing this library's version for all supported languages..."
for lang in $(cat "${supported_langs_filepath}"); do
    constant_file_rel_filepath=CONSTANT_FILE_RELATIVE_FILEPATHS["${lang}"]
    pattern_getter_function_name=CONSTANT_PATTERN_GETTER_FUNCTION_NAMES["${lang}"]

    if ! idempotent_update_constant_file_for_lang "${lang}" "${pattern_getter_function_name}" "${constant_file_rel_filepath}" "${new_version}"; then
        echo "Error: An error occurred updating the '${lang}' constant in file '${constant_file_rel_filepath}' using constant pattern retrieval function '${pattern_getter_function_name}' to version '${new_version}'" >&2
        exit 1
    fi
done
if ! find "${root_dirpath}" -name "*${SED_REPLACE_SUFFIX_FOR_DELETION}" -delete; then
    echo "Error: The constant-replacing succeeded, but an error occurred removing the sed backup files ending with suffix '${SED_REPLACE_SUFFIX_FOR_DELETION}; these will need to be removed manually" >&2
    exit 1
fi
echo "Successfully updated the constants containing this library's version have been updated for all supported languages"
