# News Feed App

A Django-based RSS feed reader application that displays news feeds in a clean, user-friendly interface.

## Features

- RSS feed parsing and display
- Clean, responsive UI
- Caching for improved performance
- Production-ready with Render deployment

## Tech Stack

- **Backend:** Django 5.1.11
- **Server:** Gunicorn
- **Static Files:** WhiteNoise
- **Parser:** Feedparser
- **Database:** SQLite (development), PostgreSQL (recommended for production)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedImran10/News_Feed_app.git
   cd News_Feed_app/RssReader
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Collect static files:
   ```bash
   python manage.py collectstatic --noinput
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

Visit `http://localhost:8000` in your browser.

## Project Structure

```
News_Feed_app/
├── RssReader/                    # Root directory
│   ├── RssReader/               # Django project configuration
│   │   ├── settings.py          # Django settings
│   │   ├── urls.py              # URL routing
│   │   ├── wsgi.py              # WSGI application
│   │   └── asgi.py              # ASGI application
│   ├── feed_reader/             # Main Django app
│   │   ├── models.py            # Database models
│   │   ├── views.py             # View logic
│   │   ├── urls.py              # App URL routing
│   │   ├── admin.py             # Admin configuration
│   │   ├── static/              # CSS, JavaScript
│   │   └── templates/           # HTML templates
│   ├── manage.py                # Django management script
│   ├── requirements.txt          # Python dependencies
│   ├── Procfile                 # Render deployment config
│   └── db.sqlite3               # Development database
└── README.md                     # This file
```

## Render Deployment

### Setup Instructions

1. **Connect Repository:** Link your GitHub repository to Render

2. **Configure Settings:**
   - **Root Directory:** `RssReader`
   - **Build Command:** 
     ```
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
     ```
   - **Start Command:**
     ```
     gunicorn --bind 0.0.0.0:$PORT RssReader.wsgi:application
     ```

3. **Set Environment Variables:**
   - `DEBUG` = `false`
   - `SECRET_KEY` = (generate a random 50+ character key)
   - `ALLOWED_HOSTS` = `your-app-name.onrender.com`
   - `SECURE_SSL_REDIRECT` = `true`

4. **Deploy:** Push to main branch and Render will auto-deploy

## Environment Variables

Create a `.env` file in the root directory with:

```env
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com
SECURE_SSL_REDIRECT=True
SECURE_BROWSER_XSS_FILTER=True
SECURE_CONTENT_TYPE_NOSNIFF=True
```

## API Endpoints

- `GET /` - Main feed page
- `GET /feed/` - Feed list view

## Development

### Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Access admin at `http://localhost:8000/admin`

### Run Tests

```bash
python manage.py test
```

### Migrations

Create migrations:
```bash
python manage.py makemigrations
```

Apply migrations:
```bash
python manage.py migrate
```

## Dependencies

- Django 5.1.11
- feedparser 6.0.11
- python-dateutil 2.9.0
- gunicorn 23.0.0
- whitenoise 6.6.0
- python-decouple 3.8

See `requirements.txt` for complete list.

## Troubleshooting

### "Bad Request (400)" Error
- Check `ALLOWED_HOSTS` includes your domain
- Ensure `DEBUG=False` in production
- Remove protocol (`https://`) from `ALLOWED_HOSTS`

### Static Files Not Loading
- Run `python manage.py collectstatic --noinput`
- Ensure WhiteNoise middleware is installed
- Check `STATIC_ROOT` and `STATICFILES_DIRS` paths

### Database Migration Issues
- Clear migrations: `python manage.py migrate --fake app 0001`
- Rerun: `python manage.py migrate`

## License

MIT License

## Author

Mohamed Imran

## Live Demo

[News Feed App on Render](https://news-feed-app-nffy.onrender.com)
