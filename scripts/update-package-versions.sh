#!/usr/bin/env bash
# 2021-07-08 WATERMARK, DO NOT REMOVE - This script was generated from the Kurtosis Bash script template

set -euo pipefail   # Bash "strict mode"
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"



# ==================================================================================================
#                                             Constants
# ==================================================================================================
LANG_ROOT_DIRPATH="$(dirname "${script_dirpath}")"

SED_REPLACE_FILENAME_SUFFIX=".DELETEME"

SPECIFIED_FILENAME="package.json"



# ==================================================================================================
#                                       Arg Parsing & Validation
# ==================================================================================================
show_helptext_and_exit() {
    echo "Usage: $(basename "${0}") new_version"
    echo ""
    echo "  new_version   The version of this repo that is about to released"
    echo ""
    exit 1  # Exit with an error so that if this is accidentally called by CI, the script will fail
}

new_version="${1:-}"

if [ -z "${new_version}" ]; then
    echo "Error: no new version provided" >&2
    show_helptext_and_exit
fi



# ==================================================================================================
#                                             Main Logic
# ==================================================================================================
function getSearchReplace() {
     value="${1:-}"
     echo "\"version\": \"${value}\""
}


# Check that our package.json can be found in the right location
if ! find ${LANG_ROOT_DIRPATH} -name ${SPECIFIED_FILENAME}; then
    echo "Error: No ${SPECIFIED_FILENAME} file can be found inside '${LANG_ROOT_DIRPATH}'" >&2
    exit 1
fi

#Check that the package.json contains exactly one line matching "version": "X.Y.Z"
if test $(grep -c $(getSearchReplace [0-9]\+\.[0-9]\+\.[0-9]\+) "${LANG_ROOT_DIRPATH}/${SPECIFIED_FILENAME}") -eq 1; then
    echo "Error: Couldn't find one line matching \"version\": \"X.Y.Z\" in ${SPECIFIED_FILENAME}" >&2
    exit 1
fi

# Do the replacement on the file - in this case, on package.json
if ! sed -i "${SED_REPLACE_FILENAME_SUFFIX}" -E "s/$(getSearchReplace [0-9]\+\.[0-9]\+\.[0-9]\+)/$(getSearchReplace ${new_version})/g" ${SPECIFIED_FILENAME}; then #No magic values, but can I use regex in variables?
    echo "Error: Replacing pattern '${search_pattern}' with value '${new_version}' in file ${SPECIFIED_FILENAME}" >&2
    exit 1
fi

# Delete the backup files that sed created
if ! find "${LANG_ROOT_DIRPATH}" -name "*${SED_REPLACE_FILENAME_SUFFIX}" -delete; then
    echo "Error: Couldn't delete the backup files that sed created ending in suffix '${SED_REPLACE_FILENAME_SUFFIX}'" > &2
    exit 1
fi