import os
import sys


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

    import django

    django.setup()

    from django.core.management.commands.runserver import Command as runserver

    runserver.default_port = "7001"

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
