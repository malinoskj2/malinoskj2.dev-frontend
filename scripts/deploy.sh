#!/bin/bash

npm run config-creds
npm run deploy

aws configure set aws_access_key_id $travis_cloudfront_key
aws configure set aws_secret_access_key $travis_cloudfront_secret
aws configure set preview.cloudfront true

aws cloudfront create-invalidation \
--distribution-id ${cloudfront_id} \
--paths "/*" >/dev/null 2>&1 
