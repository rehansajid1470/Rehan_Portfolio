/**
 * Cookie Consent Manager for Python Debugging Showcase
 * Responsible for displaying cookie consent banner and managing user preferences
 * Version: 1.0
 */

class CookieConsentManager {
    constructor() {
        this.cookieName = 'python_showcase_cookie_consent';
        this.cookieExpiry = 365; // days
        this.init();
    }

    init() {
        // Check if user has already made a choice
        if (!this.hasConsent()) {
            this.showBanner();
        }
    }

    hasConsent() {
        return document.cookie.split(';').some(item => item.trim().startsWith(`${this.cookieName}=`));
    }

    setConsent(accepted) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.cookieExpiry);
        
        document.cookie = `${this.cookieName}=${accepted ? 'accepted' : 'declined'}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
        
        // Remove banner after decision
        this.hideBanner();
        
        // If declined, disable analytics (example)
        if (!accepted) {
            this.disableAnalytics();
        }
    }

    showBanner() {
        // Create banner element
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>Cookie Consent</h3>
                <p>This website uses cookies to enhance your browsing experience and provide personalized content. 
                   We only use essential cookies to make our site work and analytical cookies to understand how you use it.</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="btn btn-primary">Accept Cookies</button>
                    <button id="cookie-decline" class="btn btn-secondary">Decline Non-Essential</button>
                </div>
                <a href="privacy-policy.html" class="cookie-policy-link">View Cookie Policy</a>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => this.setConsent(true));
        document.getElementById('cookie-decline').addEventListener('click', () => this.setConsent(false));
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => {
                banner.remove();
            }, 300); // Match the CSS transition time
        }
    }

    disableAnalytics() {
        // Placeholder for disabling analytics
        window.analyticsEnabled = false;
        
        // Example: Clear existing analytics cookies
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name] = cookie.trim().split('=');
            if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        }
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsentManager();
}); 