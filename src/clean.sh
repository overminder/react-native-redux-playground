#!/usr/bin/env bash

HERE=$(basename $(dirname $0))

rm -r \
  $HERE/main.js $HERE/basic $HERE/basic-async $HERE/support \
  $HERE/navigator-experimental* $HERE/basic-thunk

