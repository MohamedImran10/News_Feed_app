// RSS Feed Reader JavaScript Functionality

class RSSFeedReader {
    constructor() {
        this.autoRefreshInterval = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupRelativeTimes();
        this.setupCurrentTime();
        this.setupAutoRefresh();
        this.setupAnimations();
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
    }

    bindEvents() {
        // Smooth scroll to top when clicking header
        const header = document.querySelector('.feed-header');
        if (header) {
            header.addEventListener('click', () => this.scrollToTop());
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-label', 'Click to scroll to top');
        }

        // Click to expand summaries
        this.setupExpandableSummaries();

        // Add loading state management
        window.addEventListener('beforeunload', () => this.showLoading());

        // Handle refresh button if added
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.manualRefresh());
        }
    }

    setupExpandableSummaries() {
        document.querySelectorAll('.summary-text').forEach(element => {
            const fullText = element.getAttribute('data-full-text');
            const currentText = element.textContent;
            
            if (fullText && fullText.length > currentText.length) {
                element.style.cursor = 'pointer';
                element.title = 'Click to expand';
                element.setAttribute('tabindex', '0');
                element.setAttribute('role', 'button');
                element.setAttribute('aria-expanded', 'false');
                
                let isExpanded = false;
                const toggleExpansion = () => {
                    if (!isExpanded) {
                        element.textContent = fullText;
                        element.title = 'Click to collapse';
                        element.setAttribute('aria-expanded', 'true');
                        isExpanded = true;
                    } else {
                        element.textContent = currentText;
                        element.title = 'Click to expand';
                        element.setAttribute('aria-expanded', 'false');
                        isExpanded = false;
                    }
                };

                element.addEventListener('click', toggleExpansion);
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpansion();
                    }
                });
            }
        });
    }

    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }

    setupRelativeTimes() {
        this.updateRelativeTimes();
        // Update every minute
        setInterval(() => this.updateRelativeTimes(), 60000);
    }

    updateRelativeTimes() {
        document.querySelectorAll('.update-time[data-timestamp]').forEach(element => {
            const timestamp = element.getAttribute('data-timestamp');
            if (timestamp) {
                element.textContent = this.formatRelativeTime(timestamp);
            }
        });
    }

    setupCurrentTime() {
        this.updateCurrentTime();
        // Update every minute
        setInterval(() => this.updateCurrentTime(), 60000);
    }

    updateCurrentTime() {
        const currentTimeElement = document.getElementById('current-time');
        if (currentTimeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            currentTimeElement.textContent = timeString;
        }
    }

    setupAutoRefresh() {
        // Auto-refresh every 5 minutes
        this.autoRefreshInterval = setInterval(() => {
            this.autoRefresh();
        }, 300000); // 5 minutes
    }

    autoRefresh() {
        console.log('Auto-refreshing feeds...');
        window.location.reload();
    }

    manualRefresh() {
        this.showLoading();
        console.log('Manual refresh triggered');
        window.location.reload();
    }

    showLoading() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'block';
        }
    }

    hideLoading() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    setupAnimations() {
        // Animate articles on load
        const articles = document.querySelectorAll('.article-item');
        articles.forEach((article, index) => {
            article.style.opacity = '0';
            article.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                article.style.transition = 'all 0.5s ease';
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate feed cards
        const feedCards = document.querySelectorAll('.feed-card');
        feedCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key.toLowerCase()) {
                case 'r':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.manualRefresh();
                    }
                    break;
                case 't':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.scrollToTop();
                    }
                    break;
                case 'h':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.showHelp();
                    }
                    break;
                case 'escape':
                    this.hideHelp();
                    break;
            }
        });
    }

    setupAccessibility() {
        // Add ARIA labels and roles where needed
        document.querySelectorAll('.article-title').forEach(link => {
            const title = link.querySelector('span').textContent;
            link.setAttribute('aria-label', `Read article: ${title}`);
        });

        // Add skip links
        this.addSkipLinks();

        // Improve focus management
        this.improveFocusManagement();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'visually-hidden-focusable position-absolute top-0 start-0 z-index-9999 btn btn-primary';
        skipLink.style.transform = 'translateY(-100%)';
        skipLink.style.transition = 'transform 0.3s';
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.transform = 'translateY(0)';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.transform = 'translateY(-100%)';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add id to main content
        const container = document.querySelector('.container');
        if (container) {
            container.id = 'main-content';
        }
    }

    improveFocusManagement() {
        // Ensure all interactive elements are focusable
        document.querySelectorAll('.feed-card').forEach(card => {
            const firstLink = card.querySelector('.article-title');
            if (firstLink) {
                card.setAttribute('tabindex', '-1');
            }
        });
    }

    showHelp() {
        const helpModal = this.createHelpModal();
        document.body.appendChild(helpModal);
        helpModal.querySelector('.modal').style.display = 'block';
        helpModal.querySelector('.modal').focus();
    }

    hideHelp() {
        const helpModal = document.getElementById('help-modal');
        if (helpModal) {
            helpModal.remove();
        }
    }

    createHelpModal() {
        const modalHtml = `
            <div id="help-modal" class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5);">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Keyboard Shortcuts</h5>
                            <button type="button" class="btn-close" onclick="rssReader.hideHelp()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6"><kbd>R</kbd></div>
                                <div class="col-6">Refresh feeds</div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-6"><kbd>T</kbd></div>
                                <div class="col-6">Scroll to top</div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-6"><kbd>H</kbd></div>
                                <div class="col-6">Show this help</div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-6"><kbd>Esc</kbd></div>
                                <div class="col-6">Close help</div>
                            </div>
                            <hr>
                            <small class="text-muted">
                                Click on article summaries to expand them.<br>
                                The page auto-refreshes every 5 minutes.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = modalHtml;
        return div.firstElementChild;
    }

    // Performance monitoring
    logPerformance() {
        if (performance && performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    }

    // Cleanup
    destroy() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
    }
}

// Initialize the RSS Feed Reader when DOM is loaded
let rssReader;

document.addEventListener('DOMContentLoaded', () => {
    rssReader = new RSSFeedReader();
    
    // Log performance after everything is loaded
    window.addEventListener('load', () => {
        rssReader.logPerformance();
        rssReader.hideLoading();
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (rssReader) {
        rssReader.destroy();
    }
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/static/feed_reader/js/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
