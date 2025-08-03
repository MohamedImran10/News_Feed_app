import feedparser
from django.shortcuts import render
from django.core.cache import cache
from django.utils import timezone
import hashlib
import urllib.error
import socket
from dateutil.parser import parse as parse_date

def fetch_feed(url):
    # Create a safe cache key by hashing the URL
    cache_key = f'rss_feed_{hashlib.md5(url.encode()).hexdigest()}'
    cache_time = 300  # Cache for 5 minutes

    # Try to get the feed from cache
    cached_feed = cache.get(cache_key)
    if cached_feed is not None:
        return cached_feed

    # Fetch the feed if not in cache
    try:
        feed = feedparser.parse(url)
        # Check if the feed is valid
        if feed.bozo:
            print(f"Error parsing feed {url}: {feed.bozo_exception}")
            return None

        feed_data = {
            'feed_title': feed.feed.get('title', 'Unknown Feed'),
            'feed_entries': [],
            'last_updated': timezone.now(),
        }

        # Process up to 5 entries
        for entry in feed.entries[:5]:
            # Safely parse published date
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

        # Store in cache
        cache.set(cache_key, feed_data, cache_time)
        return feed_data

    except (urllib.error.URLError, socket.timeout, AttributeError) as e:
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

    # Fetch feeds and filter out None values
    feeds = [feed for feed in (fetch_feed(url) for url in feed_urls) if feed is not None]

    context = {
        'feeds': feeds,
    }
    return render(request, 'feed_reader/feed_list.html', context)