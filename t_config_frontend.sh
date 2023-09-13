#!/bin/bash

if [ -z "$BASH_VERSION" ]
then
    exec bash "$0" "$@"
fi

echo "setting config_frontend up..."
cd config_frontend
npm install
npm run build
npm run preview
