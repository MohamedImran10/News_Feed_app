
## RSS Feed Reader

A modern, responsive RSS feed reader built with Django, Bootstrap, and vanilla JavaScript. This application provides a clean, user-friendly interface to read and manage RSS feeds with advanced features like auto-refresh, keyboard shortcuts, and accessibility support.

## 🚀 Features

### Core Functionality
- **Modern UI**: Clean, responsive design using Bootstrap 5
- **Real-time Updates**: Auto-refresh feeds every 5 minutes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Sample Data**: Pre-loaded with Indian news feeds (Times of India, The Hindu, NDTV)

### User Experience
- **Expandable Summaries**: Click on article summaries to expand/collapse them
- **Smooth Animations**: Elegant fade-in animations for articles and feed cards
- **Loading States**: Visual feedback during page loads and refreshes
- **Relative Time Display**: Shows "X minutes ago" format with live updates

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support with custom shortcuts
- **Screen Reader Support**: ARIA labels and roles for assistive technologies
- **Skip Links**: Quick navigation for keyboard users
- **Focus Management**: Proper focus indicators and tab order

### Keyboard Shortcuts
- **R**: Refresh feeds
- **T**: Scroll to top
- **H**: Show help modal
- **Esc**: Close help modal
- **Enter/Space**: Expand/collapse summaries (when focused)

### Advanced Features
- **Auto-refresh**: Automatic page refresh every 5 minutes
- **Performance Monitoring**: Built-in performance logging
- **Service Worker Ready**: Prepared for offline functionality (commented out)
- **Error Handling**: Graceful error handling and user feedback

## 🛠️ Technology Stack

- **Backend**: Django 5.2
- **Frontend**: Bootstrap 5, Vanilla JavaScript (ES6+)
- **Database**: SQLite (default)
- **Icons**: Bootstrap Icons
- **Styling**: Custom CSS with Bootstrap components

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RssReader
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

7. **Open your browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
RssReader/
├── manage.py
├── db.sqlite3
├── README.md
├── RssReader/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── feed_reader/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── urls.py
    ├── views.py
    ├── migrations/
    ├── static/
    │   └── feed_reader/
    │       ├── css/
    │       │   └── styles.css
    │       └── js/
    │           └── app.js
    └── templates/
        └── feed_reader/
            └── feed_list.html
```

## 🎨 UI Components

### Header Section
- Application title with RSS icon
- Subtitle with description
- Smooth scroll-to-top functionality

### Feed Cards
- Bootstrap card layout for each RSS feed
- Feed title and last updated timestamp
- Staggered animation on page load

### Article Items
- Article title with external link icon
- Expandable summary text
- Publication date and time
- Hover effects and smooth transitions

### Footer
- Current time display with live updates
- Minimal, clean design

## 🔧 Customization

### Adding New RSS Feeds

1. **Edit the view** (`feed_reader/views.py`):
   ```python
   # Add new feed data to the sample_feeds list
   {
       'id': 'new-feed-id',
       'title': 'New Feed Title',
       'lastUpdated': '2024-01-15T10:30:00Z',
       'articles': [
           # Add articles here
       ]
   }
   ```

### Styling Customization

1. **Edit CSS** (`feed_reader/static/feed_reader/css/styles.css`):
   - Modify color schemes
   - Adjust spacing and typography
   - Add custom animations

2. **Bootstrap Variables**: 
   - Override Bootstrap variables in your CSS
   - Use CSS custom properties for easy theming

### JavaScript Features

1. **Auto-refresh Interval**: Modify in `app.js`:
   ```javascript
   // Change from 5 minutes to desired interval
   this.autoRefreshInterval = setInterval(() => {
       this.autoRefresh();
   }, 300000); // 300000ms = 5 minutes
   ```

2. **Animation Timing**: Adjust animation delays and durations in the `setupAnimations()` method

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interactions
- Optimized for mobile reading experience
- Swipe gestures (can be implemented)

## 🔒 Security Features

- Django's built-in CSRF protection
- XSS protection through template escaping
- Secure external link handling (`rel="noopener noreferrer"`)

## 🚀 Performance

- Optimized JavaScript with ES6+ features
- Efficient DOM manipulation
- Lazy loading animations
- Performance monitoring built-in

## 🧪 Testing

Run Django tests:
```bash
python manage.py test
```

##Output

<img width="1909" height="964" alt="Screenshot From 2025-08-03 16-01-08" src="https://github.com/user-attachments/assets/db238d52-e088-482f-9782-66ae1bb507f3" />


## 📈 Future Enhancements

### Planned Features
- [ ] Real RSS feed integration
- [ ] User authentication and personal feeds
- [ ] Feed management (add/remove feeds)
- [ ] Search functionality
- [ ] Offline reading with service workers
- [ ] Dark/light theme toggle
- [ ] Export articles (PDF, EPUB)
- [ ] Social sharing integration

### Technical Improvements
- [ ] API endpoints for mobile app
- [ ] WebSocket integration for real-time updates
- [ ] Caching implementation
- [ ] Database optimization
- [ ] Unit and integration tests
- [ ] Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Django team for the robust web framework
- Sample news content inspired by major Indian news outlets
- Icons provided by Bootstrap Icons

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include browser information and steps to reproduce

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release with core RSS reading functionality
- Bootstrap 5 integration
- JavaScript interactivity and animations
- Accessibility features
- Keyboard shortcuts
- Auto-refresh capability

---

**Made with ❤️ using Django and Bootstrap**

