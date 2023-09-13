#!/bin/bash

if [ -z "$BASH_VERSION" ]
then
    exec bash "$0" "$@"
fi

if command -v python &>/dev/null; then
    PYTHON_CMD="python"
elif command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
else
    echo "python not found"
    exit 1
fi

echo "setting execution_engine up..."
cd execution_engine
$PYTHON_CMD -m pip install -r requirements.txt
$PYTHON_CMD manage.py runserver
