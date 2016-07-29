#!/bin/bash
while :
do
  $(npm bin)/tsc -w
  /usr/bin/env echo -e "\e[1;31mThere is something wrong, restarting TSC...\e[0m"
  sleep 1
done
