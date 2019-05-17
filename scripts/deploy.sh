#!/bin/bash

eval "$(ssh-agent -s)"

# Set correct perm
chmod 600 ./id_rsa

# add to ssh agent
ssh-add ./id_rsa

# Clear old files
ssh -i ./id_rsa -p 34 -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" travis@malinoskj2.dev rm -r /www/malinoskj2.dev/*

# Copy new dist files to be served
scp -i ./id_rsa -P 34 -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -r ${TRAVIS_BUILD_DIR}/dist/* travis@malinoskj2.dev:/www/malinoskj2.dev/
