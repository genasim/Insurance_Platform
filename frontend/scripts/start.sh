#!/bin/bash

node -v
npm -v

cd ${HOME_PROJECT_DIR} || exit 1
git config --global --add safe.directory $HOME_PROJECT_DIR

echo "  -> Running: npm install"
npm install

echo "  -> Running: npm start"
npm run dev