#!/usr/bin/env bash
# 2021-07-08 WATERMARK, DO NOT REMOVE - This script was generated from the Kurtosis Bash script template

set -euo pipefail   # Bash "strict mode"
script_dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"



# ==================================================================================================
#                                             Constants
# ==================================================================================================
# TODO Fill constants here with UPPER_SNAKE_CASE, noting that the only variables constants may use are:
# TODO  1) other constants (with the "${OTHER_CONSTANT}" syntax)
# TODO  2) script_dirpath/root_dirpath from above
LANG_ROOT_DIRPATH="$(dirname "${script_dirpath}")"
SED_REPLACE_FILENAME_SUFFIX=".DELETEME"


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

# TODO Modify this arg validation to match your arguments, keeping in mind:
# TODO - Almost every arg should be verified to be non-empty
# TODO - Filepath/dirpath ags often need to have their existence checked
if [ -z "${new_version}" ]; then
    echo "Error: no new version provided" >&2
    show_helptext_and_exit
fi



# ==================================================================================================
#                                             Main Logic
# ==================================================================================================
# TODO implement your main logic here using the args & constants, keeping in mind that:
# TODO - Non-constant variables should be lower_snake_case
# TODO - Variables should be referenced like this: ${some_variable}
# TODO - Capturing subprocess output should be done using $(), NOT backticks ``, like so:
# TODO
# TODO      my_variable="$(echo "Something")"
# TODO
# TODO - Every call should have its return value checked like so:
# TODO
# TODO       if ! some_command; then 
# TODO           echo "Error: Some description of the error" >&2
# TODO           exit 1
# TODO       fi


# Validate assumptions
# Check that our package.json can be found in the right location
if ! find $LANG_ROOT_DIRPATH -name "package.json"; then
    echo "Error: No package.json file can be found inside '${LANG_ROOT_DIRPATH}'" >&2
    exit 1
fi

#Check that the package.json contains exactly one line matching "version": "X.Y.Z"
if ! grep "version: "X.Y.Z"" "$LANG_ROOT_DIRPATH/package.json"; then #TODO
    echo "Error: Couldn't find version property in package.json" >&2
    exit 1
fi

# Do the replacement on the file - in this case, on package.json
if ! sed -i "${SED_REPLACE_FILENAME_SUFFIX}" 's/${X.Y.Z}/'${new_version}'/g' "package.json"; then
    echo "Error: Replacing pattern '${search_pattern}' with value '${new_version}' in file package.json" >&2
    exit 1
fi

# Delete the backup files that sed created
if ! find "${root_dirpath}" -name "*${SED_REPLACE_FILENAME_SUFFIX}" -delete; then
    echo "Error: Couldn't delete the backup files that sed created ending in suffix '${SED_REPLACE_FILENAME_SUFFIX}'" > &2
    exit 1
fi