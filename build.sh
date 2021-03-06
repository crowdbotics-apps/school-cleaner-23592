#!/bin/bash

# If we'll be executing this build from package.json in 'frontend' directory
# Then we don't have to cd frontend

# Finds the name of the current directory
cur_dir=${PWD##*/}

# If current directory isn't "frontend", that is we're in the build.sh directory
# then cd into frontend
if [ "$cur_dir" != "frontend" ]
then
    # shellcheck disable=SC2164
    cd frontend
fi

if [[ -d build ]]
then
    echo "/build exists on your filesystem."
    rm -rf build
fi



## Run rest of the commands if we're already in the frontend directory

# Build the frontend
yarn build

# Make root directory in frontend/build if it doesn't exist
mkdir -p build/root

## Only keep index.html in build and move rest of the files in build/root/
#   # -E in grep stands for regex
#   # -v is to find non-matching lines
#   # Hence, the files that are other than index.html, build or root will be selected
#   # And all those selected files will be moved inside build/root directory

for file in $(ls build | grep -E -v '^(index\.html|static|root)$');
do
    mv "build/$file" build/root;
done


cd ..
