#!/bin/bash

cd ${HOME_PROJECT_DIR} || exit 1
git config --global --add safe.directory $HOME_PROJECT_DIR

echo "start BACKEND script"
sleep 999999
# echo "  -> Running: bun install"
# bun install