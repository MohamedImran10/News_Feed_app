# 📰 RSS Feed Reader

A lightweight Django-based RSS feed reader that aggregates and displays the latest news from major Indian news sources in a clean, responsive interface.

## ✨ Features

- **Multi-Source RSS Aggregation** - Fetches news from 7+ major Indian news outlets (Times of India, NDTV, The Hindu, Hindustan Times, Indian Express, Economic Times, Zee News)
- **Smart Caching** - 5-minute cache to reduce server load and improve response time
- **Responsive Design** - Mobile-friendly Bootstrap 5 UI with smooth animations
- **Feed Validation** - Robust error handling for malformed or inaccessible feeds
- **Real-time Updates** - Auto-refresh display with timestamp updates
- **Production-Ready** - Deployed on Render with WhiteNoise static file serving
- **Clean Article Display** - Shows title, summary, published date, and direct links to full articles

## 🛠️ Tech Stack

- **Backend:** Django 5.1.11
- **Server:** Gunicorn 23.0.0
- **Static Files:** WhiteNoise 6.6.0
- **RSS Parser:** Feedparser 6.0.11
- **Frontend:** Bootstrap 5.3, HTML5, CSS3, JavaScript
- **Database:** SQLite (development)
- **Caching:** Django in-memory cache
- **Deployment:** Render

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

## 📰 Supported News Sources

The app aggregates RSS feeds from these major Indian news outlets:

1. **Times of India** - https://timesofindia.indiatimes.com/rssfeedstopstories.cms
2. **NDTV News** - https://feeds.feedburner.com/ndtvnews-top-stories
3. **The Hindu** - https://www.thehindu.com/news/feeder/default.rss
4. **Hindustan Times** - https://www.hindustantimes.com/rss/topnews/rssfeed.xml
5. **Indian Express** - https://indianexpress.com/feed/
6. **Economic Times** - https://economictimes.indiatimes.com/rssfeedstopstories.cms
7. **Zee News** - https://zeenews.india.com/rss/india-national-news.xml

Each source displays up to 5 latest articles with title, summary, publication date, and direct link.

## 🚀 How It Works

1. **Feed Fetching**: The `feed_list` view in `views.py` fetches RSS feeds from 7 Indian news sources
2. **Caching**: Each feed is cached for 5 minutes using Django's cache framework to reduce load
3. **Error Handling**: Malformed feeds or network errors are gracefully handled - failed feeds are skipped
4. **Data Processing**: Articles are extracted with title, link, summary, and published date
5. **Rendering**: Data is passed to the template and displayed with Bootstrap styling
6. **Auto-Refresh**: JavaScript updates timestamps in real-time without full page reload

## 📦 Dependencies

### Core
- Django 5.1.11
- feedparser 6.0.11
- python-dateutil 2.9.0

### Production
- gunicorn 23.0.0 (WSGI server)
- whitenoise 6.6.0 (static file serving)
- python-decouple 3.8 (environment variables)

### Additional
- asgiref 3.9.1
- sqlparse 0.5.1
- tzdata 2025.2

See `requirements.txt` for complete list with pinned versions.

## 🌐 Endpoints

| URL | Method | Description |
|-----|--------|-------------|
| `/` | GET | Main page - displays all RSS feeds |
| `/feed/` | GET | Feed list view (same as `/`) |

## 🔧 Customization

### Add New News Sources

Edit `RssReader/feed_reader/views.py` in the `feed_list` function:

```python
feed_urls = [
    'https://existing-feed.com/rss',
    'https://your-new-feed.com/rss',  # Add here
]
```

### Change Cache Duration

In `views.py`, modify the `cache_time` variable:

```python
cache_time = 300  # 5 minutes (in seconds)
```

### Customize Article Display

Edit the template at `feed_reader/templates/feed_reader/feed_list.html` to change layout and styling.

### Modify Styling

Update CSS files:
- Main styles: `feed_reader/static/feed_reader/css/styles.css`
- JavaScript: `feed_reader/static/feed_reader/js/app.js`

## ⚠️ Troubleshooting

### "Bad Request (400)" Error
**Cause**: `ALLOWED_HOSTS` misconfiguration
- ✅ Solution: Ensure `ALLOWED_HOSTS` in `settings.py` includes your domain WITHOUT `https://`
- Example: `news-feed-app-nffy.onrender.com` (not `https://news-feed-app-nffy.onrender.com`)

### Static Files Not Loading (CSS/JS broken)
**Cause**: WhiteNoise not configured or `collectstatic` not run
- ✅ Solution: Run `python manage.py collectstatic --noinput`
- Verify `STATICFILES_STORAGE` is set to `whitenoise.storage.CompressedManifestStaticFilesStorage`

### Feed Not Showing / Empty Page
**Cause**: RSS feed URL is broken or inaccessible
- ✅ Solution: Check network requests in browser DevTools
- Verify the feed URL is still active (some feeds may be deprecated)
- Check Django logs for feed parsing errors

### Module Not Found Error During Deploy
**Cause**: Missing `RssReader/RssReader/` nested module structure
- ✅ Solution: Ensure proper structure:
  ```
  RssReader/
  ├── RssReader/
  │   ├── settings.py
  │   ├── urls.py
  │   └── wsgi.py
  ├── manage.py
  └── requirements.txt
  ```

### Render Build Fails
**Cause**: Incorrect Root Directory or build command
- ✅ Solution: Set in Render dashboard:
  - **Root Directory**: `RssReader`
  - **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
  - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT RssReader.wsgi:application`

## 📝 License

MIT License

## 👤 Author

Mohamed Imran

## 🔗 Live Demo

[News Feed App on Render](https://news-feed-app-nffy.onrender.com)
