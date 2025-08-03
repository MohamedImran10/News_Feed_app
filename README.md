#RSS Feed Reader

Overview
The RSS Feed Reader is a Django-based web application designed to aggregate and display news articles from various Indian news agencies using their RSS feeds. It fetches the latest articles from sources like Times of India, NDTV, The Hindu, and others, caching the results for improved performance. The frontend presents a clean, minimal interface with feed titles, article summaries, and links to full articles.
Features

Fetches RSS feeds from multiple Indian news agencies.
Displays up to 5 articles per feed with titles, summaries, and publication dates.
Caches feed data for 5 minutes to reduce server load.
Simple, responsive frontend using Django templates and basic CSS.
Extensible for adding search functionality with Elasticsearch (optional).

Prerequisites

Python 3.10
Django 5.2.2
Virtual environment (recommended)
Dependencies:
feedparser (6.0.11)
python-dateutil (2.9.0.post0)
elasticsearch (7.17.12, optional for search functionality)


Elasticsearch server (optional, if indexing feeds)

Setup Instructions

Clone the Repository (if applicable) or create the project structure:
django-admin startproject rss_reader
cd rss_reader
python manage.py startapp feed_reader


Activate Virtual Environment:Create and activate a Python 3.10 virtual environment:
python3.10 -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows


Install Dependencies:
pip install django==5.2.2 feedparser==6.0.11 python-dateutil==2.9.0.post0

Optionally, for Elasticsearch integration:
pip install elasticsearch==7.17.12


Configure Django Settings:

Add feed_reader to INSTALLED_APPS in rss_reader/settings.py:INSTALLED_APPS = [
    ...
    'feed_reader',
]


Configure a cache backend (e.g., local memory cache) in rss_reader/settings.py:CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}




Set Up URLs:

In rss_reader/urls.py:from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('feed_reader.urls')),
]


In feed_reader/urls.py:from django.urls import path
from . import views

urlpatterns = [
    path('', views.feed_list, name='feed_list'),
]




Add Views:

In feed_reader/views.py:import feedparser
from django.shortcuts import render
from django.core.cache import cache
from django.utils import timezone
import hashlib
from dateutil.parser import parse as parse_date

def fetch_feed(url):
    cache_key = f'rss_feed_{hashlib.md5(url.encode()).hexdigest()}'
    cache_time = 300
    cached_feed = cache.get(cache_key)
    if cached_feed is not None:
        return cached_feed
    try:
        feed = feedparser.parse(url)
        if feed.bozo:
            print(f"Error parsing feed {url}: {feed.bozo_exception}")
            return None
        feed_data = {
            'feed_title': feed.feed.get('title', 'Unknown Feed'),
            'feed_entries': [],
            'last_updated': timezone.now(),
        }
        for entry in feed.entries[:5]:
            published = entry.get('published', 'No date available')
            try:
                published = parse_date(published) if published != 'No date available' else published
            except (ValueError, TypeError):
                published = 'Invalid date format'
            feed_data['feed_entries'].append({
                'title': entry.get('title', 'No title'),
                'link': entry.get('link', '#'),
                'summary': entry.get('summary', 'No summary available'),
                'published': published,
            })
        cache.set(cache_key, feed_data, cache_time)
        return feed_data
    except Exception as e:
        print(f"Error fetching feed {url}: {str(e)}")
        return None

def feed_list(request):
    feed_urls = [
        'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        'https://feeds.feedburner.com/ndtvnews-top-stories',
        'https://www.thehindu.com/news/feeder/default.rss',
        'https://www.hindustantimes.com/rss/topnews/rssfeed.xml',
        'https://indianexpress.com/feed/',
        'https://economictimes.indiatimes.com/rssfeedstopstories.cms',
        'https://zeenews.india.com/rss/india-national-news.xml',
    ]
    feeds = [feed for feed in (fetch_feed(url) for url in feed_urls) if feed is not None]
    context = {'feeds': feeds}
    return render(request, 'feed_reader/feed_list.html', context)




Create Template:

Create a directory feed_reader/templates/feed_reader/ and add feed_list.html:<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSS Feed Reader</title>
    <style>
        .feed {
            margin-bottom: 30px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>RSS Feed Reader</h1>
    {% for feed in feeds %}
        <div class="feed">
            <h2>{{ feed.feed_title }}</h2>
            <p>Last updated: {{ feed.last_updated }}</p>
            <ul>
                {% for entry in feed.feed_entries %}
                    <li>
                        <h3><a href="{{ entry.link }}" target="_blank">{{ entry.title }}</a></h3>
                        <p>{{ entry.summary|safe|truncatewords:30 }}</p>
                        <small>Published: {{ entry.published }}</small>
                    </li>
                {% endfor %}
            </ul>
        </div>
    {% empty %}
        <p>No feeds available at this time.</p>
    {% endfor %}
</body>
</html>




Run Migrations:
python manage.py makemigrations
python manage.py migrate


Start the Server:
python manage.py runserver

Access the app at http://localhost:8000/.


Usage

Visit http://localhost:8000/ to view the RSS feed reader.
The homepage displays a list of feeds from Indian news agencies, each with up to 5 articles showing titles, summaries, and publication dates.
Click article titles to visit the full article on the news agency’s website.
Feeds are cached for 5 minutes to improve performance.

Optional: Elasticsearch Integration
To index feed data for search functionality:

Install and run an Elasticsearch server (version 7.17.x):curl http://localhost:9200


Update views.py to index entries (see previous responses for example).
Create an rss_feeds index:curl -X PUT "localhost:9200/rss_feeds"



Troubleshooting

ModuleNotFoundError: No module named 'feedparser':Ensure the virtual environment is activated (source venv/bin/activate) and use the correct Python (venv/bin/python manage.py runserver).
TemplateDoesNotExist:Verify feed_list.html is in feed_reader/templates/feed_reader/.
Cache Issues:Ensure a cache backend is configured in settings.py.
Non-printable Characters:Check files (urls.py, views.py) for non-ASCII characters using an editor with hidden character display.

Future Improvements

Add advanced CSS for better styling and responsiveness.
Implement a search feature using Elasticsearch.
Add pagination or a "Load More" button for large feeds.
Use a task queue (e.g., Celery) for asynchronous feed fetching.

License
This project is unlicensed. Use and modify it as needed for personal or educational purposes.
