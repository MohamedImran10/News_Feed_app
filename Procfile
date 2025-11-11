release: python RssReader/manage.py migrate && python RssReader/manage.py collectstatic --noinput
web: gunicorn --bind 0.0.0.0:$PORT --chdir RssReader RssReader.wsgi:application
