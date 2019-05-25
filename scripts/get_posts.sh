#!/usr/bin/env bash

# Get posts from cms and write to file

endpoint='https://cms.malinoskj2.dev/api/collections/get/posts';

mkdir -p build && 
curl -X GET $endpoint > build/posts.json
