/**
 * Cookie Consent Manager for Python Debugging Showcase
 * GDPR Compliant cookie management system
 * Version: 1.0.0
 */

class CookieConsentManager {
    constructor(options = {}) {
        this.options = {
            cookieName: 'python-debug-consent',
            expiryDays: 365,
            necessaryOnly: false,
            modalId: 'cookie-consent-modal',
            privacyPolicyUrl: 'privacy-policy.html',
            ...options
        };
        
        this.consentCategories = {
            necessary: true, // Always required
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        this.initialized = false;
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        // Check if consent already given
        const storedConsent = this.getCookie(this.options.cookieName);
        
        if (storedConsent) {
            try {
                const consentData = JSON.parse(storedConsent);
                this.consentCategories = {...this.consentCategories, ...consentData};
                this.applyConsent();
            } catch (e) {
                console.error('Error parsing stored consent:', e);
                this.showConsentModal();
            }
        } else {
            this.showConsentModal();
        }
        
        this.initialized = true;
    }
    
    showConsentModal() {
        // Create modal if it doesn't exist
        let modal = document.getElementById(this.options.modalId);
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = this.options.modalId;
            modal.className = 'cookie-consent-modal';
            
            modal.innerHTML = `
                <div class="consent-modal-content">
                    <div class="consent-header">
                        <h3>Cookie Consent</h3>
                    </div>
                    <div class="consent-body">
                        <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking "Accept All", you consent to our use of cookies. Visit our 
                        <a href="${this.options.privacyPolicyUrl}">Privacy Policy</a> to learn more.</p>
                        
                        <div class="consent-options">
                            <div class="consent-option">
                                <input type="checkbox" id="necessary" checked disabled>
                                <label for="necessary">Necessary (Required)</label>
                                <div class="option-description">Essential for website functionality</div>
                            </div>
                            
                            <div class="consent-option">
                                <input type="checkbox" id="analytics" ${this.consentCategories.analytics ? 'checked' : ''}>
                                <label for="analytics">Analytics</label>
                                <div class="option-description">Help us improve by tracking anonymous usage</div>
                            </div>
                            
                            <div class="consent-option">
                                <input type="checkbox" id="preferences" ${this.consentCategories.preferences ? 'checked' : ''}>
                                <label for="preferences">Preferences</label>
                                <div class="option-description">Remember your settings and choices</div>
                            </div>
                            
                            <div class="consent-option">
                                <input type="checkbox" id="marketing" ${this.consentCategories.marketing ? 'checked' : ''}>
                                <label for="marketing">Marketing</label>
                                <div class="option-description">Display relevant content based on your interests</div>
                            </div>
                        </div>
                    </div>
                    <div class="consent-footer">
                        <button class="btn-accept-all">Accept All</button>
                        <button class="btn-accept-necessary">Necessary Only</button>
                        <button class="btn-customize">Save Preferences</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add event listeners
            modal.querySelector('.btn-accept-all').addEventListener('click', () => {
                this.setAllConsent(true);
                this.saveConsent();
                this.hideModal(modal);
            });
            
            modal.querySelector('.btn-accept-necessary').addEventListener('click', () => {
                this.setAllConsent(false);
                this.saveConsent();
                this.hideModal(modal);
            });
            
            modal.querySelector('.btn-customize').addEventListener('click', () => {
                this.updateConsentFromInputs();
                this.saveConsent();
                this.hideModal(modal);
            });
            
            // Prevent clicks inside modal from closing it
            modal.querySelector('.consent-modal-content').addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Show the modal
        modal.style.display = 'flex';
    }
    
    hideModal(modal) {
        modal.style.display = 'none';
    }
    
    updateConsentFromInputs() {
        const analytics = document.getElementById('analytics');
        const preferences = document.getElementById('preferences');
        const marketing = document.getElementById('marketing');
        
        if (analytics) this.consentCategories.analytics = analytics.checked;
        if (preferences) this.consentCategories.preferences = preferences.checked;
        if (marketing) this.consentCategories.marketing = marketing.checked;
    }
    
    setAllConsent(value) {
        this.consentCategories.analytics = value;
        this.consentCategories.marketing = value;
        this.consentCategories.preferences = value;
    }
    
    saveConsent() {
        this.setCookie(
            this.options.cookieName,
            JSON.stringify(this.consentCategories),
            this.options.expiryDays
        );
        this.applyConsent();
    }
    
    applyConsent() {
        // Apply consent settings to the page
        if (!this.consentCategories.analytics) {
            // Disable analytics scripts
            this.disableScriptsByCategory('analytics');
        }
        
        if (!this.consentCategories.marketing) {
            // Disable marketing scripts
            this.disableScriptsByCategory('marketing');
        }
        
        // Trigger event for other scripts to react
        document.dispatchEvent(new CustomEvent('consentUpdated', {
            detail: { consent: this.consentCategories }
        }));
    }
    
    disableScriptsByCategory(category) {
        const scripts = document.querySelectorAll(`script[data-consent="${category}"]`);
        scripts.forEach(script => {
            script.type = 'text/plain';
        });
    }
    
    setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax; Secure';
    }
    
    getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }
    
    // Public API
    openPreferences() {
        this.showConsentModal();
    }
}

// Initialize the consent manager when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsentManager();
    
    // Add button event listener for "Cookie Settings" in the footer
    const cookieSettingsBtn = document.querySelector('.cookie-settings-btn');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.cookieConsent.openPreferences();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        // Create the cookie consent banner
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <h3>Cookie Consent</h3>
                <p>This website uses cookies to ensure you get the best experience on our website. By continuing to browse, you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="btn btn-primary">Accept</button>
                    <button id="cookie-decline" class="btn btn-secondary">Only Necessary</button>
                    <a href="privacy.html" class="cookie-more">Privacy Policy</a>
                </div>
            </div>
        `;
        
        // Append the banner to the body
        document.body.appendChild(cookieBanner);
        
        // Add event listeners for the buttons
        document.getElementById('cookie-accept').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookiePreference', 'all');
            cookieBanner.style.display = 'none';
            enableAllCookies();
        });
        
        document.getElementById('cookie-decline').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookiePreference', 'necessary');
            cookieBanner.style.display = 'none';
            disableNonEssentialCookies();
        });
    } else {
        // If user has already made a choice, respect their preference
        const preference = localStorage.getItem('cookiePreference');
        if (preference === 'all') {
            enableAllCookies();
        } else {
            disableNonEssentialCookies();
        }
    }
});

function enableAllCookies() {
    // Analytics and other third-party scripts would be initialized here
    console.log('All cookies enabled');
    
    // Example: Initialize analytics
    // if (typeof initializeAnalytics === 'function') {
    //     initializeAnalytics();
    // }
}

function disableNonEssentialCookies() {
    // Only keep necessary cookies for website functionality
    console.log('Only necessary cookies enabled');
    
    // Example: Disable analytics tracking
    // window['ga-disable-UA-XXXXXXXX-X'] = true;
} 