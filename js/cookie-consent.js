/**
 * Cookie Consent Management
 * This script handles cookie consent notifications and user preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already provided consent
    const hasConsent = getCookie('cookie_consent');
    
    if (!hasConsent) {
        showConsentBanner();
    }

    // Add event listeners to consent buttons
    document.addEventListener('click', function(event) {
        if (event.target.matches('#accept-cookies')) {
            acceptCookies();
        } else if (event.target.matches('#reject-cookies')) {
            rejectCookies();
        } else if (event.target.matches('#cookie-settings')) {
            showCookieSettings();
        }
    });
});

/**
 * Display the cookie consent banner
 */
function showConsentBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <h3>Cookie Consent</h3>
            <p>This website uses cookies to enhance your browsing experience and analyze site traffic. 
               By clicking "Accept All", you consent to our use of cookies.</p>
            <div class="cookie-buttons">
                <button id="accept-cookies" class="btn-primary">Accept All</button>
                <button id="reject-cookies" class="btn-secondary">Reject Non-Essential</button>
                <button id="cookie-settings" class="btn-text">Cookie Settings</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);
}

/**
 * Handle user accepting all cookies
 */
function acceptCookies() {
    // Set consent cookie for 6 months
    setCookie('cookie_consent', 'all', 180);
    setCookie('analytics_consent', 'true', 180);
    setCookie('marketing_consent', 'true', 180);
    
    // Hide the consent banner
    hideConsentBanner();
    
    // Initialize analytics and other services that require consent
    initializeServices();
}

/**
 * Handle user rejecting non-essential cookies
 */
function rejectCookies() {
    // Set consent cookie for necessary cookies only
    setCookie('cookie_consent', 'necessary', 180);
    setCookie('analytics_consent', 'false', 180);
    setCookie('marketing_consent', 'false', 180);
    
    // Hide the consent banner
    hideConsentBanner();
}

/**
 * Show detailed cookie settings modal
 */
function showCookieSettings() {
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Cookie Settings</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" id="necessary-cookies" checked disabled>
                        Necessary Cookies <span class="required">(Required)</span>
                    </label>
                    <p>These cookies are essential for the website to function properly.</p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" id="analytics-cookies">
                        Analytics Cookies
                    </label>
                    <p>These cookies help us understand how visitors interact with our website.</p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" id="marketing-cookies">
                        Marketing Cookies
                    </label>
                    <p>These cookies are used to track visitors across websites to display relevant advertisements.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button id="save-preferences" class="btn-primary">Save Preferences</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Set checkboxes based on existing preferences
    const analyticsConsent = getCookie('analytics_consent') === 'true';
    const marketingConsent = getCookie('marketing_consent') === 'true';
    
    document.getElementById('analytics-cookies').checked = analyticsConsent;
    document.getElementById('marketing-cookies').checked = marketingConsent;
    
    // Add event listeners
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    document.getElementById('save-preferences').addEventListener('click', function() {
        const analyticsChecked = document.getElementById('analytics-cookies').checked;
        const marketingChecked = document.getElementById('marketing-cookies').checked;
        
        setCookie('cookie_consent', 'custom', 180);
        setCookie('analytics_consent', analyticsChecked.toString(), 180);
        setCookie('marketing_consent', marketingChecked.toString(), 180);
        
        // Hide both modal and banner
        document.body.removeChild(modal);
        hideConsentBanner();
        
        // Initialize services based on preferences
        initializeServices();
    });
}

/**
 * Hide the consent banner
 */
function hideConsentBanner() {
    const banner = document.querySelector('.cookie-consent-banner');
    if (banner) {
        document.body.removeChild(banner);
    }
}

/**
 * Initialize services based on user consent
 */
function initializeServices() {
    const analyticsConsent = getCookie('analytics_consent') === 'true';
    const marketingConsent = getCookie('marketing_consent') === 'true';
    
    if (analyticsConsent) {
        // Initialize analytics (placeholder - replace with actual implementation)
        console.log('Analytics initialized');
    }
    
    if (marketingConsent) {
        // Initialize marketing cookies (placeholder - replace with actual implementation)
        console.log('Marketing services initialized');
    }
}

/**
 * Set a cookie with name, value and expiration days
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

/**
 * Get a cookie value by name
 */
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
} 