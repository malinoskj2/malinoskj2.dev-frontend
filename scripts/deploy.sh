#!/bin/bash

eval "$(ssh-agent -s)"

# Set correct perm
chmod 600 ./id_rsa

# add to ssh agent
ssh-add ./id_rsa

# Clear old files
ssh -i ./id_rsa -p 34 -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" travis@${ec2_ip} rm -r /www/malinoskj2.dev/*

# Copy new dist files to be served
scp -i ./id_rsa -P 34 -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -r ${TRAVIS_BUILD_DIR}/dist/* travis@${ec2_ip}:/www/malinoskj2.dev/

aws configure set aws_access_key_id $travis_cloudfront_key
aws configure set aws_secret_access_key $travis_cloudfront_secret
aws configure set preview.cloudfront true

aws cloudfront create-invalidation \
--distribution-id ${cloudfront_id} \
--paths "/*" >/dev/null 2>&1 
