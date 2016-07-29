#!/usr/bin/env bash

HERE=$(basename $(dirname $0))

rm -r \
  $HERE/*.js $HERE/basic $HERE/basic-async $HERE/support \
  $HERE/navigator-experimental* $HERE/basic-thunk

git checkout -- $HERE/index.android.js $HERE/index.ios.js
