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

echo "setting config_backend up..."
cd config_backend
$PYTHON_CMD -m pip install -r requirements.txt
rm ../policy_db/db.sqlite3
$PYTHON_CMD manage.py makemigrations
$PYTHON_CMD manage.py migrate
$PYTHON_CMD manage.py seed
$PYTHON_CMD manage.py runserver
